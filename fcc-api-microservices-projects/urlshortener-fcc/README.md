# Node.js Logics



## URL SHORTENER FREECODECAMP



1. Get URL

   1. if POST request at /api/shorturl/new
      1. if false ---> return error
      2. else --->
         1. check in database for url
            1. if exists 
               1. get its shorten url ---> send response
            2. else 
               1. generate a shortid
               2. check for short id 
                  1. if exists ---> generate another ^ go up
                  2. else ---> store it  ---> send back response

2. if request to /api/new

   1. check for shorten url

      1. if exists ---> redirect

      2. else ---> error

         

   