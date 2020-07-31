set identity_insert [Category] on
insert into [Category] ([Id], [Name]) 
values (1, 'Eat'), (2, 'Drink'), (3, 'Stay'), (4, 'Go'), (5, 'Relax'),
	   (6, 'Play')
set identity_insert [Category] off