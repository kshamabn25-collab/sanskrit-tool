set appName to "Script Tool.app"
set installPath to "/Applications/" & appName

-- Find the app sitting next to this installer
set installerFolder to POSIX path of ((path to me as text) & "::")
set sourcePath to installerFolder & appName

-- Copy to Applications (no sudo needed for /Applications on modern macOS)
try
	do shell script "cp -rf " & quoted form of sourcePath & " " & quoted form of installPath
on error errMsg
	display dialog "Could not copy the app: " & errMsg buttons {"OK"} default button "OK" with title "Installation Failed"
	return
end try

-- Remove Gatekeeper quarantine so the app opens without a warning
do shell script "xattr -rd com.apple.quarantine " & quoted form of installPath

-- Launch
do shell script "open " & quoted form of installPath

display dialog "Script Tool installed! Use ⌥⇧M to toggle Sanskrit IME, ⌥⇧S to open the quick panel." buttons {"OK"} default button "OK" with title "Installation Complete" with icon note
