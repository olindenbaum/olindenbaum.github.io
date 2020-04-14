cd cook_safe_moderator/oldversion
del /F /S /Q * 
@echo "REMOVED OLD VERSION"
PAUSE
cd ..
for %i in (*) do MOVE "%~i" /oldversion

@echo "MOVED FILES"
PAUSE

