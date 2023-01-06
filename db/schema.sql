-- Convention: associative table are prefixed with `assoc_*`.

create table teacher (
  id serial primary key,
  email varchar(50) not null,
  name varchar(100) not null,
  age int not null
);

create table student (
  id serial primary key,
  email varchar(30) not null,
  name varchar(100) not null,
  age int not null
);

create table class (
  id serial primary key,
  subject varchar(100) not null
);

create table assoc_teacher_class (
  id serial primary key,
  teacher_id int not null references teacher(id),
  class_id int not null references class(id)
);

create table assoc_student_class (
  id serial primary key,
  student_id int not null references student(id),
  teacher_class_id int not null references assoc_teacher_class(id)
);

create table student_grade (
  id serial primary key,
  student_class_id int not null references assoc_student_class(id),
  value int null,
  inserted_at DATE NOT NULL
);