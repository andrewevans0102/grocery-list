import sys

try:
  # environment.ts
  with open('frontend/src/environments/environment.ts', 'r') as file :
    filedata = file.read()

  filedata = filedata.replace('API_KEY', sys.argv[1])
  filedata = filedata.replace('AUTH_DOMAIN', sys.argv[2])
  filedata = filedata.replace('DATABASE_URL', sys.argv[3])
  filedata = filedata.replace('PROJECT_ID', sys.argv[4])
  filedata = filedata.replace('STORAGE_BUCKET', sys.argv[5])
  filedata = filedata.replace('MESSAGE_SENDER_ID', sys.argv[6])

  with open('frontend/src/environments/environment.ts', 'w') as file:
    file.write(filedata)

  # environment.prod.ts
  with open('frontend/src/environments/environment.prod.ts', 'r') as file :
    filedata = file.read()

  filedata = filedata.replace('API_KEY', sys.argv[1])
  filedata = filedata.replace('AUTH_DOMAIN', sys.argv[2])
  filedata = filedata.replace('DATABASE_URL', sys.argv[3])
  filedata = filedata.replace('PROJECT_ID', sys.argv[4])
  filedata = filedata.replace('STORAGE_BUCKET', sys.argv[5])
  filedata = filedata.replace('MESSAGE_SENDER_ID', sys.argv[6])

  with open('frontend/src/environments/environment.prod.ts', 'w') as file:
    file.write(filedata)


  # index.js
  with open('functions/index.js', 'r') as file :
    filedata = file.read()

  filedata = filedata.replace('OC_slack1', sys.argv[7])
  filedata = filedata.replace('OC_slack2', sys.argv[8])

  with open('functions/index.js', 'w') as file:
    file.write(filedata)

except IOError:
    print('An error occured trying to read the file.')

except ValueError:
    print('Non-numeric data found in the file.')

except ImportError:
    print "NO module found"

except EOFError:
    print('Why did you do an EOF on me?')

except KeyboardInterrupt:
    print('You cancelled the operation.')

except:
    print('An error occured.')
