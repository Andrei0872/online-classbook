insert into teacher
values
  (
    DEFAULT,
    'teacher1@foobar.com',
    'Teacher 1',
    39
  ),
  (
    DEFAULT,
    'teacher2@foobar.com',
    'Teacher 2',
    25
  ),
  (
    DEFAULT,
    'teacher3@foobar.com',
    'Teacher 3',
    44
  );

insert into student
values
  (
    DEFAULT,
    'student1@foobar.com',
    'Student 1',
    15
  ),
  (
    DEFAULT,
    'student2@foobar.com',
    'Student 2',
    14
  ),
  (
    default,
    'student3@foobar.com',
    'student 3',
    16
  );

insert into class
values
  (
    DEFAULT,
    'Math'
  ),
  (
    DEFAULT,
    'History'
  ),
  (
    DEFAULT,
    'Sports'
  ),
  (
    DEFAULT,
    'Geography'
  ),
  (
    DEFAULT,
    'Physics'
  ),
  (
    DEFAULT,
    'Chemistry'
  );

insert into assoc_teacher_class
values
  (
    DEFAULT,
    1,
    1
  ),
  (
    DEFAULT,
    1,
    2
  ),
  (
    DEFAULT,
    2,
    3
  ),
  (
    DEFAULT,
    2,
    4
  ),
  (
    DEFAULT,
    3,
    5
  ),
  (
    DEFAULT,
    3,
    6
  );

insert into assoc_student_class
values
  (
    DEFAULT,
    1,
    1
  ),
  (
    DEFAULT,
    1,
    2
  ),
  (
    DEFAULT,
    1,
    3
  );

insert into student_grade
values
  (
    DEFAULT,
    1,
    8,
    '2022-04-19'
  ),
  (
    DEFAULT,
    1,
    9,
    '2022-05-11'
  ),
  (
    DEFAULT,
    2,
    8,
    '2022-03-19'
  ),
  (
    DEFAULT,
    2,
    10,
    '2022-02-20'
  ),
  (
    DEFAULT,
    3,
    9,
    '2022-04-13'
  ),
  (
    DEFAULT,
    3,
    7,
    '2022-04-25'
  );
