# サンプルアプリを次の様に配置した場合、
#  /home/nodejs/ptf_download3.js
#  /home/nodejs/views/ilevel3.ejs
#  /home/nodejs/views/index3.ejs
# Qshellから当スクリプトを実行する事でデモアプリが始動します。
# webブラウザで次の要領でurlを入力してデモアプリをお試しください。
#  例：http://xxx.xxx.xxx.xxx:60056

QIBM_MULTI_THREADED=Y
PATH=/QOpenSys/pkgs/lib/nodejs14/bin                                           
cd /home/nodejs
node ptf_download3.js
