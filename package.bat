@echo off
REM DAP Extension Packaging Script
REM Author: Antoine Marchal
REM Date: August 2025

echo ===============================================
echo    DAP Extension Packaging Script
echo    Author: Antoine Marchal
echo    Date: August 2025
echo ===============================================
echo.

REM Get current date for version suffix
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~2,2%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "datestamp=%YY%%MM%%DD%"

REM Set package name
set "package_name=DAP-Extension-v1.0.0-%datestamp%"

echo Creating package: %package_name%
echo.

REM Create temp directory
if exist "temp_package" rmdir /s /q "temp_package"
mkdir "temp_package"

REM Copy extension files
echo Copying extension files...
xcopy /E /I /Q "actions" "temp_package\actions\"
xcopy /E /I /Q "content" "temp_package\content\"
xcopy /E /I /Q "icons" "temp_package\icons\"
xcopy /E /I /Q "libs" "temp_package\libs\"
xcopy /E /I /Q "tours" "temp_package\tours\"
xcopy /E /I /Q "ui" "temp_package\ui\"

copy "manifest.json" "temp_package\"
copy "init.js" "temp_package\"

REM Create README for package
echo Creating package README...
(
echo # DAP Extension - Package Contents
echo.
echo **Author:** Antoine Marchal
echo **Version:** 1.0.0
echo **Build Date:** %date%
echo **Package:** %package_name%
echo.
echo ## Installation Instructions
echo.
echo 1. Open Chrome and navigate to `chrome://extensions/`
echo 2. Enable "Developer mode" toggle in top-right
echo 3. Click "Load unpacked" button
echo 4. Select this folder ^(%package_name%^)
echo 5. The extension will be loaded and ready to use
echo.
echo ## Usage
echo.
echo 1. Navigate to any `*.3dexperience.3ds.com` domain
echo 2. Look for the floating help icon in bottom-right corner
echo 3. Click the icon to access tours and quick actions
echo.
echo ## Support
echo.
echo For issues or questions, contact: Antoine Marchal
echo Package generated on: %date% %time%
) > "temp_package\README.txt"

REM Create zip package
if exist "%package_name%.zip" del "%package_name%.zip"
powershell -Command "Compress-Archive -Path 'temp_package\*' -DestinationPath '%package_name%.zip'"

REM Clean up temp directory
rmdir /s /q "temp_package"

echo.
echo ===============================================
echo Package created successfully!
echo File: %package_name%.zip
echo Size: 
for %%I in ("%package_name%.zip") do echo %%~zI bytes
echo ===============================================
echo.
echo The extension is ready for distribution!
echo To install: Extract the zip and load as unpacked extension in Chrome.
echo.
pause