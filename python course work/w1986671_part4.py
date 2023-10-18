# Student ID: w1986671
# Date: 21/04/2023



stu_ID=''
out=" "
out_dict={}

def outcomes(Pass,Defer,Fail,st_ID):
    if Pass==120:
        out_dict[stu_ID]="Progress -{0}, {1}, {2},".format(Pass,Defer,Fail)
        return "Progress"
    elif Pass==100:
        out_dict[stu_ID]="Progress (module trailer) -{0}, {1}, {2},".format(Pass,Defer,Fail)
        return "Progress (module trailer)"
    elif Pass+Defer>=Fail:
        out_dict[stu_ID]="Module retriever -{0}, {1}, {2},".format(Pass,Defer,Fail)
        return "Module retriever"
    else:
        out_dict[stu_ID]="Exclude -{0}, {1}, {2},".format(Pass,Defer,Fail)
        return "Exclude"

def get_input(txt):     #get credit
    while True:
        x=input("Please enter your credits at {}:".format(txt)).strip()
        try:
            x=int(x)
            if x not in [0,20,40,60,80,100,120]:
                print("Out of range\n")
            else:
                return x
        except ValueError:
            print("Integer required\n")

def get_stu_ID():                    #Get student id
    global stu_ID
    stu_ID=input('Enter Student ID: ')
    stu_ID.lower()
    if not(stu_ID[0]=='w' and len(stu_ID)==8 and stu_ID[1:].isnumeric()) :
        print('Invalid Student ID')
        get_stu_ID()
    elif stu_ID in out_dict.keys():
        print('student id already exist')
        while True:
            yn=input('Do you want to update the student id for details(y/n) :')
            yn=yn.lower()
            if yn=='y':
                break
            elif yn=='n':
                get_stu_ID()
            else:
                print('Invalid Input')


def printdict():
    for i,j in out_dict.items():
        print(i+" : ",j)

while True:
    get_stu_ID()
    Pass=get_input("pass")
    Defer=get_input("defer")
    Fail=get_input("fail")
        
    if Pass+Defer+Fail!=120:
        print("Total incorrect.\n")
        continue
        
    print(outcomes(Pass,Defer,Fail,stu_ID),"\n")

    while True:
        print("Would you like to enter another set of data?")
        yq=input("Enter 'y' for yes or 'q' to quit and view results: ").strip()
        yq=yq.lower()
        if yq=='q':
            print('Part 4:')
            printdict()
            exit()
        elif yq=='y':
            break
        else:
            print('Invalid Input\n')
            