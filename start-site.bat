@echo off
chcp 65001 >nul
title ТОО Скиф — локальный сайт
cd /d "%~dp0"

echo.
echo ========================================
echo   Запуск сайта ТОО «Скиф»
echo ========================================
echo.

where node >nul 2>&1
if errorlevel 1 (
    echo [ОШИБКА] Node.js не установлен.
    echo Скачайте с https://nodejs.org и установите, затем запустите снова.
    pause
    exit /b 1
)

if not exist "node_modules\" (
    echo Установка зависимостей...
    call npm install
    if errorlevel 1 (
        echo [ОШИБКА] Не удалось установить зависимости.
        pause
        exit /b 1
    )
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo Останавливаю старый процесс на порту 3000...
    taskkill /PID %%a /F >nul 2>&1
)

if exist ".next\dev\lock" del /f ".next\dev\lock" >nul 2>&1

echo.
echo Сервер запускается...
echo.
echo   Откройте в браузере:  http://localhost:3000
echo.
echo   НЕ ЗАКРЫВАЙТЕ это окно, пока смотрите сайт!
echo   Остановка: Ctrl+C
echo.

start "" "http://localhost:3000"
call npm run dev

pause
