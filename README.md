# Stargazer Addin
Excel addin aspect of Stargazer, written using Excel JS API.

### Instructions to run for dev
This has been killing me so I'm writing the steps down

1. make sure you've run nvm use v18.18.2

2. make sure you've cleared add-in cache in Excel. From Excel:
    1. File
    2. Options
    3. Trust Center
    4. Trust Center Settings
    5. Trusted Add-in Catalog
    6. ☑ Next time Office starts, clear all previously-started web add-ins cache.
    7. OK
    8. OK
    9. OK
    10. Fully shut down Excel
        
(must be done every time as the box unchecks upon restart)

11. make sure there are no node.js processes running from task manager (or close down previous web pack cmd windows)

12. 'npm run build' 

13. 'npm run start:desktop'

14. pray

If that doesn't work, it may also be worth trying to clear the dist directory.

Why Microsoft? Why does it have to be so hard?
