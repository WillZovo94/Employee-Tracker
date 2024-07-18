DO $$
BEGIN
INSERT INTO department (name) VALUES
('IT'),
('Sales'),
('Marketing'),
('Business');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 120000, 1),
('Sales Representitive', 50000, 2),
('SEO Specalist', 65000, 3),
('Business Analyst', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Smith', 1, NULL),
('Bill', 'Silver', 2, 4),
('Jessica', 'Garcia', 3, 1),
('Alice', 'Williams', 4, NULL);
RAISE NOTICE 'Database Read';

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'An error occured: %', SqLERRM;
        ROLLBACK;
END;
$$;
