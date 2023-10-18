# Student ID: w1986671
# Date: 21/04/2023
#iit_stuid=20223170
#count outcome
progress,trialer,retriever,exclude=0,0,0,0      
outcomeList=[]
version=''

def outcomes(Pass,Defer,Fail):
    global progress,trialer,retriever,exclude
    if Pass==120:
        progress+=1
        outcomeList.append("Progress - {}, {}, {}".format(Pass,Defer,Fail))
        return "Progress"
    elif Pass==100:
        trialer+=1
        outcomeList.append("Progress (module trailer) - {}, {}, {}".format(Pass,Defer,Fail))    
        return "Progress (module trailer)"
    elif Pass+Defer>=Fail:
        retriever+=1
        outcomeList.append("Module retriever - {}, {}, {}".format(Pass,Defer,Fail))
        return "Module retriever"
    else:
        exclude+=1
        outcomeList.append("Exclude - {}, {}, {}".format(Pass,Defer,Fail))
        return "Exclude"

def get_version():
    global version
    version=input('Enter your student or staff :')   #Input version
    version=version.lower()
    if not(version=='student' or version=='staff'):
        print('Invalid Input\n')
        get_version()

def get_input(txt):     #for input and validate marks
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

def histrogram(progress,trialer,retriever,exclude):
    print('-'*50)
    print("Progress {}\t: {}".format(progress,'*'*progress),"Trailer {}\t: {}".format(trialer,'*'*trialer),"Retriever {}\t: {}".format(retriever,'*'*retriever),"Exclude {}\t: {}".format(exclude,'*'*exclude),sep='\n',end='\n')
    print(progress+trialer+retriever+exclude,"outcomes in total.")
    print('-'*50)

def outList(outcomeList):
    out='\n'.join(outcomeList)      # join list items with new line
    return out                      # ezy to print list, use for text file

def rwText(out):
    with open("output.txt","w+") as File:
        File=open("output.txt","w+")
        File.write(out)
        File.seek(0)
        print(File.read())

get_version()
print()

while True:
    Pass=get_input("pass")
    Defer=get_input("defer")
    Fail=get_input("fail")

    if Pass+Defer+Fail!=120:            #validation part
        print("Total incorrect.\n")
        continue           
    
    print(outcomes(Pass,Defer,Fail),"\n")
    if version=='staff':
        while True:
            print("Would you like to enter another set of data?")
            yq=input("Enter 'y' for yes or 'q' to quit and view results: ").strip()
            print()
            yq=yq.lower()
            if yq=='q':
                histrogram(progress,trialer,retriever,exclude)
                out=outList(outcomeList)
                print('Part 2:')
                print(out)
                print('\nPart 3:')
                rwText(out)
                exit() #exit the program
            elif yq=='y':
                break
            else:
                print('Invalid Input\n')
    else:
        break