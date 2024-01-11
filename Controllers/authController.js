const db = require('knex')(require('../Configuration/DBConfig')['development']);

exports.registration = (async (req,res)=> {
    const email = req.query.email;
    const password = req.query.password;
    const confirmPassword = req.query.confirmPassword;
    const name = req.query.name;
    try {
        const findUser = await db('users')
            .select('Name')
            .where('Email',email)
            .andWhere('Password',password);
        if(findUser.length>0){
            return res.status(200).json({success:true, message:"Already Registered", user: null});
        }
        else {
       const user = await db('users')
        .insert({
            Email:email,
            Password:password,
            ConfirmPassword:confirmPassword,
            Name:name           
        }).returning('*');
        console.log(user);
        return res.status(200).json({success:true, message:"Registered", user: user});
}
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:error, user: null});
        
    }
});
exports.login = (async (req,res) => {
    const email = req.query.email;
    const password = req.query.password;
    try {
        const user = await db('users')
        .select('*')
        .where('Email',email)
        .andWhere('Password',password);
        if(user.length>0){
            return res.status(200).json({success:true, message:"Login Successfully", user: user});
        }
        else{
            return res.status(200).json({success:true, message:"wrong Credentials or Registered First", user: null});

        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:error, user: null});
    }
});