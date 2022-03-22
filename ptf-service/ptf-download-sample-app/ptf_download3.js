const { Connection, CommandCall } = require('itoolkit');
const { parseString } = require('xml2js');
var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var app = express();
var select_ptfno = "";
app.set("view engine", "ejs");

var DBname = "IBMIDEMO";
var userId = "YAG";
var passwd = "passw0rd";
var ip = "127.0.0.1"
var port = 60056;

app.get('/', (req, res) => {
    const {dbconn, dbstmt} = require('idb-connector');
    const sql = `With iLevel(iVersion, iRelease) AS (select OS_VERSION, OS_RELEASE from sysibmadm.env_sys_info)
                 SELECT VARCHAR(GRP_CRNCY,26) AS "GRPCUR",
                        GRP_ID,  VARCHAR(GRP_TITLE, 100) AS "NAME",
                        GRP_LVL, GRP_IBMLVL, GRP_LSTUPD,
                        GRP_RLS, GRP_SYSSTS
                 FROM iLevel, systools.group_ptf_currency P
                 WHERE ptf_group_release =
                 'R' CONCAT iVersion CONCAT iRelease concat '0'
                 ORDER BY ptf_group_level_available -
                 ptf_group_level_installed DESC`;
    const conn = new dbconn();
    conn.conn(DBname, userId, passwd);
    const statement = new dbstmt(conn);
    const data = statement.execSync(sql);
    var ilevels3 = data;
    var strm = {ilevels3};
    console.log(strm);
    res.render('index3.ejs', strm);
    statement.close();
    conn.disconn();
    conn.close();
});

app.get('/ptf_download', (req, res) => {
    select_ptfno = url.parse(req.url, true).query.ptfno;
    console.log('SELECT_PTFNO: ' + select_ptfno);
    console.log('START IBMI COMMAND');
    const connection = new Connection({
        transport: 'ssh',
        transportOptions: { host: ip, username: userId, password: passwd },
    });
    const strm = 'SBMJOB CMD(SNDPTFORD PTFID((' + select_ptfno + '))) JOB(' + select_ptfno + ')'
    const command = new CommandCall({ type: 'cl', command: strm });
    console.log('COMMAND');
    console.log(command);
    connection.add(command);
    connection.run((error, xmlOutput) => {
        if (error) {
            throw error;
        }
        parseString(xmlOutput, (parseError, result) => {
            if (parseError) {
                throw parseError;
            }
            console.log(JSON.stringify(result));
        });
    });
    setTimeout(() => {
        res.redirect("/");
    }, 3000);
});

app.listen(port, function () {
    console.log('Example app listening on port' + port + '!');
});
