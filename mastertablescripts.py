import requests
import json

# api-endpoint
URL_DEP = "http://127.0.0.1:8000/department/insertBulkDepartments/"
URL_DEPTYPE = "http://127.0.0.1:8000/department/insertBulkDepartmentTypes/"
URL_DEPHEAD = "http://127.0.0.1:8000/department/insertBulkDepartmentHeads/"
URL_ADDUSER = "http://127.0.0.1:8000/users/addUser/"
URL_QTYPES = "http://127.0.0.1:8000/feedback/insertBulkQuestionTypes/"

# location given here
location = "Me"

# defining a params dict for the parameters to be sent to the API
departments_list = {
    "departments": [
        {
            "name": "Department of Architecture & Civil Engineering",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Chemical Engineering",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Electronic & Electrical Engineering",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Mechanical Engineering",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Economics",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Education",
            "type": "Academic",
            "number_of_students": 200
        },
        {"name": "Department of Health",
            "type": "Academic", "number_of_students": 200},
        {
            "name": "Department of Politics, Languages & International Studies",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Psychology",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Social & Policy Sciences",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Biology & Biochemistry",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Chemistry",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Computer Science",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Mathematical Sciences",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Natural Sciences",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Pharmacy & Pharmacology",
            "type": "Academic",
            "number_of_students": 200
        },
        {"name": "Department of Physics",
            "type": "Academic", "number_of_students": 200},
        {
            "name": "Department of Accounting, Finance & Law",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Marketing, Business & Society",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Information, Decisions & Operations",
            "type": "Academic",
            "number_of_students": 200
        },
        {
            "name": "Department of Strategy & Organisation",
            "type": "Academic",
            "number_of_students": 200
        },
        {"name": "Academic Registry", "type": "Professional services",
            "number_of_students": 200},
        {
            "name": "Accommodation, Eateries, Events and Security (AHS)",
            "type": "Professional services",
            "number_of_students": 200
        },
        {"name": "Arts & Culture", "type": "Professional services",
            "number_of_students": 200},
        {"name": "Careers Service", "type": "Professional services",
            "number_of_students": 200},
        {
            "name": "Central Postgraduate Taught Admissions",
            "type": "Professional services",
            "number_of_students": 200
        },
        {
            "name": "Centre for Learning and Teaching",
            "type": "Professional services",
            "number_of_students": 200
        },
        {"name": "Communications", "type": "Professional services",
            "number_of_students": 200},
        {
            "name": "Department of Policy Planning and Compliance",
            "type": "Professional services",
            "number_of_students": 200
        },
        {
            "name": "Development and Alumni Relations",
            "type": "Professional services",
            "number_of_students": 200
        },
        {
            "name": "Digital, Data and Technology",
            "type": "Professional services",
            "number_of_students": 200
        },
        {"name": "Estates", "type": "Professional services", "number_of_students": 200},
        {"name": "Executive Education",
            "type": "Professional services", "number_of_students": 200},
        {
            "name": "Finance and Procurement",
            "type": "Professional services",
            "number_of_students": 200
        },
        {"name": "Human Resources", "type": "Professional services",
            "number_of_students": 200},
        {
            "name": "International Relations Office",
            "type": "Professional services",
            "number_of_students": 200
        },
        {"name": "Library", "type": "Professional services", "number_of_students": 200},
        {"name": "Marketing", "type": "Professional services",
            "number_of_students": 200},
        {
            "name": "Research and Innovation Services (RIS)",
            "type": "Professional services",
            "number_of_students": 200
        },
        {"name": "Skills Centre", "type": "Professional services",
            "number_of_students": 200},
        {
            "name": "Student Immigration Service",
            "type": "Professional services",
            "number_of_students": 200
        },
        {"name": "Student Support", "type": "Professional services",
            "number_of_students": 200},
        {
            "name": "Undergraduate Admissions and Outreach",
            "type": "Professional services",
            "number_of_students": 200
        },
        {
            "name": "Vice-Chancellor's Office",
            "type": "Professional services",
            "number_of_students": 200
        },
        {"name": "Food and Drink", "type": "Services and facilities",
            "number_of_students": 200},
        {
            "name": "Sports Training Village",
            "type": "Services and facilities",
            "number_of_students": 200
        },
        {"name": "The Edge", "type": "Services and facilities",
            "number_of_students": 200},
        {"name": "Students' union", "type": "Services and facilities",
            "number_of_students": 200},
        {"name": "Westwood Nursery", "type": "Services and facilities",
            "number_of_students": 200},
        {"name": "Dental Centre", "type": "Services and facilities",
            "number_of_students": 200},
        {"name": "Medical Centre", "type": "Services and facilities",
            "number_of_students": 200},
        {"name": "Chaplaincy", "type": "Services and facilities",
            "number_of_students": 200},
        {"name": "Learning Commons", "type": "Services and facilities",
            "number_of_students": 200}
    ]
}

department_types = {
    "department_types": [
        {
            "id": 1,
            "name": "Academic"
        },
        {
            "id": 3,
            "name": "Services and facilities"
        },
        {
            "id": 2,
            "name": "Professional services"
        },
        {
            "id": 4,
            "name": "Research centres, institutes and groups"
        },
    ]
}
department_heads = {
    "department_heads": [
        {
            "name": "Department of Architecture & Civil Engineering",
            "user_id": "admin"
        },
        {
            "name": "Department of Chemical Engineering",
            "user_id": "admin"
        },
        {
            "name": "Department of Electronic & Electrical Engineering",
            "user_id": "admin"
        },
        {
            "name": "Department of Mechanical Engineering",
            "user_id": "admin"
        },
        {
            "name": "Department of Economics",
            "user_id": "admin"
        },
        {
            "name": "Department of Education",
            "user_id": "admin"
        },
        {
            "name": "Department of Health",
            "user_id": "admin"},
        {
            "name": "Department of Politics, Languages & International Studies",
            "user_id": "admin"
        },
        {
            "name": "Department of Psychology",
            "user_id": "admin"
        },
        {
            "name": "Department of Social & Policy Sciences",
            "user_id": "admin"
        },
        {
            "name": "Department of Biology & Biochemistry",
            "user_id": "admin"
        },
        {
            "name": "Department of Chemistry",
            "user_id": "admin"
        },
        {
            "name": "Department of Computer Science",
            "user_id": "admin"
        },
        {
            "name": "Department of Mathematical Sciences",
            "user_id": "admin"
        },
        {
            "name": "Department of Natural Sciences",
            "user_id": "admin"
        },
        {
            "name": "Department of Pharmacy & Pharmacology",
            "user_id": "admin"
        },
        {"name": "Department of Physics",
            "user_id": "admin"},
        {
            "name": "Department of Accounting, Finance & Law",
            "user_id": "admin"
        },
        {
            "name": "Department of Marketing, Business & Society",
            "user_id": "admin"
        },
        {
            "name": "Department of Information, Decisions & Operations",
            "user_id": "admin"
        },
        {
            "name": "Department of Strategy & Organisation",
            "user_id": "admin"
        },
        {"name": "Academic Registry",
            "user_id": "admin"},
        {
            "name": "Accommodation, Eateries, Events and Security (AHS)",
            "user_id": "admin"
        },
        {"name": "Arts & Culture",
            "user_id": "admin"},
        {"name": "Careers Service",
            "user_id": "admin"},
        {
            "name": "Central Postgraduate Taught Admissions",
            "user_id": "admin"
        },
        {
            "name": "Centre for Learning and Teaching",
            "user_id": "admin"
        },
        {"name": "Communications",
            "user_id": "admin"},
        {
            "name": "Department of Policy Planning and Compliance",
            "user_id": "admin"
        },
        {
            "name": "Development and Alumni Relations",
            "user_id": "admin"
        },
        {
            "name": "Digital, Data and Technology",
            "user_id": "admin"
        },
        {"name": "Estates",
            "user_id": "admin"},
        {"name": "Executive Education",
            "user_id": "admin"},
        {
            "name": "Finance and Procurement",
            "user_id": "admin"
        },
        {"name": "Human Resources",
            "user_id": "admin"},
        {
            "name": "International Relations Office",
            "user_id": "admin"
        },
        {"name": "Library",
            "user_id": "admin"},
        {"name": "Marketing",
            "user_id": "admin"},
        {
            "name": "Research and Innovation Services (RIS)",
            "user_id": "admin"
        },
        {"name": "Skills Centre",
            "user_id": "admin"},
        {
            "name": "Student Immigration Service",
            "user_id": "admin"
        },
        {"name": "Student Support",
            "user_id": "admin"},
        {
            "name": "Undergraduate Admissions and Outreach",
            "user_id": "admin"
        },
        {
            "name": "Vice-Chancellor's Office",
            "user_id": "admin"
        },
        {"name": "Food and Drink",
            "user_id": "admin"},
        {
            "name": "Sports Training Village",
            "user_id": "admin"
        },
        {"name": "The Edge",
            "user_id": "admin"},
        {"name": "Students' union",
            "user_id": "admin"},
        {"name": "Westwood Nursery",
            "user_id": "admin"},
        {"name": "Dental Centre",
            "user_id": "admin"},
        {"name": "Medical Centre",
            "user_id": "admin"},
        {"name": "Chaplaincy",
            "user_id": "admin"},
        {"name": "Learning Commons",
            "user_id": "admin"}
    ]
}
question_types = {
    "question_answer_types": [
        {
            "id": 1,
            "name": "text",
            "question_type": "Text"
        },
        {
            "id": 2,
            "name": "checkbox",
            "question_type": "Single Option Selection"
        },
        {
            "id": 3,
            "name": "radio",
            "question_type": "Multiple Option Selection"
        },
    ]
}

# sending get request and saving the response as response object
r = requests.post(url=URL_DEPTYPE, data=json.dumps(department_types))
print(r.text)
r = requests.post(url=URL_DEP, data=json.dumps(departments_list))
print(r.text)
r = requests.post(url=URL_QTYPES, data=json.dumps(question_types))
print(r.text)


def createUser():
    admin_name = input("Enter email_id:")
    admin_password = input("Enter password:")

    data = {
        "username": admin_name,
        "password": admin_password,
        "is_admin": True,
        "full_name": "admin",
        "department": "Department of Computer Science"
    }
    r = requests.post(url=URL_ADDUSER, data=json.dumps(data))
    print(r.text)

    nonadmin_name = input("Enter nonadmin email_id:")
    nonadmin_password = input("Enter password:")

    data = {
        "username": nonadmin_name,
        "password": nonadmin_password,
        "is_admin": False,
        "full_name": "Non Admin",
        "department": "Department of Computer Science"
    }
    r = requests.post(url=URL_ADDUSER, data=json.dumps(data))
    print(r.text)


createUser()
r = requests.post(url=URL_DEPHEAD, data=json.dumps(department_heads))
print(r.text)
