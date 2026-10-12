@echo off
title Jayant Portfolio Local Server
echo ==========================================================
echo Starting Jayant Portfolio Local Server...
echo ==========================================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
