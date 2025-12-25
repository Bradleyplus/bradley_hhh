@echo off
echo 正在快速部署到GitHub...

cd /d "d:\AI agent\AI agent\test2"

echo 1. 检查Git状态
git status

echo.
echo 2. 添加所有更改
git add .

echo.
echo 3. 提交更改
git commit -m "快速部署 - 修复英文模式计分问题"

echo.
echo 4. 推送到GitHub
git push origin master

echo.
echo 5. 部署完成！
echo 请等待2-5分钟后访问：https://bradleyplus.github.io/bradley_hhh/
echo.
echo 提示：如果仍然看不到更新，请尝试：
echo - 清除浏览器缓存（Ctrl+F5）
echo - 使用隐私模式访问
echo - 等待GitHub Pages更新

pause