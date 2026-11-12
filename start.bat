@echo off
setlocal
rem Lanceur HELIOS-SIM : verifie Node.js, installe les dependances si besoin, demarre le serveur local.
rem Texte volontairement sans accents : cmd.exe affiche mal l'UTF-8.
pushd "%~dp0"
title HELIOS-SIM - serveur local

echo ============================================
echo   HELIOS-SIM - serveur local
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 goto nonode
where npm.cmd >nul 2>nul
if errorlevel 1 goto nonode

if exist "node_modules\vite\bin\vite.js" goto run

echo Premiere installation des dependances, quelques minutes...
call npm.cmd install
if errorlevel 1 goto installfail

:run
echo.
echo Demarrage du serveur. Le navigateur va s'ouvrir tout seul.
echo Si le port 5173 est occupe, l'adresse affichee ci-dessous fait foi.
echo Gardez cette fenetre ouverte pendant l'utilisation, Ctrl+C pour arreter.
echo.
call npm.cmd run dev -- --open
echo.
echo Le serveur s'est arrete.
goto end

:nonode
echo [ERREUR] Node.js est introuvable.
echo Installez la version LTS depuis https://nodejs.org puis relancez ce fichier.
goto end

:installfail
echo.
echo [ERREUR] L'installation des dependances a echoue.
echo Verifiez la connexion Internet puis relancez ce fichier.
goto end

:end
echo.
popd
pause
endlocal
