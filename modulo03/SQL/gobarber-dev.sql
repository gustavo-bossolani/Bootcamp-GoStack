create database gobarber;
use gobarber;

select * from SequelizeMeta;

select * from users;
select * from files;
select * from appointments;


/*---------- JOIN AREA ----------*/
/*---------- USER & FILES ----------*/
select users.name as user_name, files.name as file_name 
from users join files where users.avatar_id = files.id;

/*---------- TRUNCATE AREA ----------*/
truncate users;
truncate files;
truncate appointments;