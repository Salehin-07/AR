# E-Sports Django Project (Upgraded UI + Validations)

This upgraded package includes a more modern responsive UI and backend improvements:
- django-jazzmin included for admin styling
- Frontend: modern responsive templates (vanilla CSS/JS)
- Backend: replaced join-request status with boolean `paid`
- Frontend + backend validations for join form
- 'My Applications' page: /my/applications/ (shows only active tournaments and credentials only when `paid` is true)

Quick start:
1. Python 3.12 virtualenv
2. pip install -r requirements.txt
3. python manage.py migrate
4. python manage.py create_demo_data
5. python manage.py runserver

Super: super/superpass | Admin: admin1/adminpass | Player: player/playerpass
