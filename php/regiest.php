<?php
    header("Access-Control-Allow-Origin:*");
    $username=@$_POST['username'];
    $password=@$_POST['password'];
    if($username==""||$password==""){
        die('参数不全，缺少账号密码');
    }
    $con=mysql_connect("localhost","root","123456");
    if(!$con){
        die("数据库连接失败".mysql_error());
    }
    
    mysql_select_db("project",$con);
    if(mysql_error()){
        die("数据库选中失败".mysql_error());
    }
   
    $sql_select_all="SELECT username FROM zuanshilist WHERE username='$username'";
    $select_res=mysql_query($sql_select_all);
    while($row = mysql_fetch_array($select_res)){
        if($row["username"] == $username){
            die("用户名重名");
        }
        echo "这个名字非常完美";
    }
    $password=md5($password);
    $sql_insert_item="INSERT INTO zuanshilist(username,password)
                    VALUES
                    ('$username','$password')";
    $insert_res=mysql_query($sql_insert_item);
    if(!$insert_res){
        echo "数据库插入错误".mysql_error();
    }
    echo $insert_res;
    mysql_close($con);
?>