::输入提交内容
::set /p commit_msg=Please input commit message:
::添加
git add .
::提交
git commit -m "%date:~0,4%%date:~5,2%%date:~8,2%"
::推送到远程
git push

::pause