store reusable function that are used by middlewares also controller means it can be used anywhere
so its functions that can used anywhere so we put them in  utils
like Password hashing, token generation, date formatting

chatgpt:-
middleware for modify request/response & it have jwt authentication , zod validation , ....
utils for reusable function  it have  jwt_helper(sign&verify jwt)  ,  hashing_helper(hash&compare password)  ,  unique_id_genrate
means do jwt sign,comapare then hasing hash,compare in utils and in middleware just call them when needed?