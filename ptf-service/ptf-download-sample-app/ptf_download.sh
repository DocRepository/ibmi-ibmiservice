# サンプルアプリを次のように配置した場合、Qshellからこのスクリプトを実行する事でデモアプリが始動できます。
#  /home/nodejs/ptf_download3.js
#  /home/nodejs/views/ilevel3.ejs
#  /home/nodejs/views/index3.ejs
# webブラウザから次の例のようにurlを入力してデモアプリにアクセスしてください。
#  例：http://IPアドレス:60056

QIBM_MULTI_THREADED=Y
PATH=/QOpenSys/pkgs/lib/nodejs14/bin                                           
cd /home/nodejs
node ptf_download3.js
