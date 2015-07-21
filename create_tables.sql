create table tipo_peca
(
id 			serial				primary key,
nome 		varchar(150),
descricao 	varchar(300),
preco 		real,
quantidade 	int
);


create table peca
(
numero_serie	varchar(100)	primary key,
validade		varchar(12),
status			int,
id_tipo_peca	int				references tipo_peca(id)
);

create table tipo_servico
(
id				serial			primary key,
nome 			varchar(150),
descricao		varchar(300),
especialidade	int,
valor_mao_obra	real
);

create table equipe
(
id				serial			primary key
);

create table os
(
numero_os		serial			primary key,
data_emissao	varchar(12),
valor			real,
data_conclusao	varchar(12),
status			int,
motivo_suspensao int,
total_pecas		int,
id_equipe		int				references equipe(id)		
);

create table servico
(
id				serial			primary key,
valor			real,
numero_pecas	int,
numero_serie_peca varchar(100)	references tipo_peca(numero_serie),
id_tipo_servico	int				references tipo_servico(id),
numero_os		int				references os(numero_os)
);

create table mecanico
(
codigo_mecanico	serial			primary key,
nome			varchar(150),
end_rua			varchar(150),
end_complemento	varchar(50),
end_cep			varchar(10),
end_cidade		varchar(50),
end_estado		varchar(50),
telefone_1		varchar(20),
telefone_2		varchar(20),
especialidade	int
);

create table usuario
(
nome_usuario	varchar(20)		primary key,
senha			varchar(50),
nivel_acesso	int
);

create table cliente
(
nome_usuario	varchar(20) 	primary key references usuario,
nome			varchar(150),
end_rua			varchar(150),
end_complemento	varchar(50),
end_cep			varchar(10),
end_cidade		varchar(50),
end_estado		varchar(50),
telefone_1		varchar(20),
telefone_2		varchar(20)
);

create table funcionario
(
nome_usuario	varchar(20)		primary key references usuario,
nome			varchar(150),
end_rua			varchar(150),
end_complemento	varchar(50),
end_cep			varchar(10),
end_cidade		varchar(50),
end_estado		varchar(50),
telefone_1		varchar(20),
telefone_2		varchar(20),
salario			real,
cargo			varchar(50)
);

create table veiculo
(
renavan			int				primary key,
placa			varchar(10),	
marca			varchar(20),
modelo			varchar(20),
ano				varchar(12),
nome_usuario	varchar(20)		references cliente
);

create table agendamento
(
id				serial			primary key,
data			varchar(12),
hora			varchar(12),
renavan_veiculo	int				references veiculo(renavan),
funcionario		varchar(20)		references funcionario(nome_usuario)
);

create table equipe_mecanico
(
codigo_mecanico_1	int	 		references mecanico(codigo_mecanico),
codigo_mecanico_2	int			references mecanico(codigo_mecanico),
id_equipe			int			references equipe(id),
primary key (codigo_mecanico_1, codigo_mecanico_2, id_equipe)
);

insert into usuario values ('gerente','senha',0);
insert into usuario values ('atendente','senha',1);
insert into usuario values ('tecnico1','senha',2);
insert into usuario values ('tecnico2','senha',2);
insert into usuario values ('tecnico3','senha',2);
insert into usuario values ('tecnico4','senha',2);
insert into usuario values ('cliente1','senha',3);
insert into usuario values ('cliente2','senha',3);
insert into usuario values ('cliente3','senha',3);
insert into usuario values ('cliente4','senha',3);
insert into usuario values ('cliente5','senha',3);
insert into usuario values ('cliente6','senha',3);

insert into funcionario values ('gerente','Matheus Carvalho Pereira','Rua Alcino Vicente, 1858','','51900-122','Poços de Caldas','MG','3770-4354','',10000,'gerente');
insert into funcionario values ('atendente','Vitória Pinto Ferreira','Rua Jorge Moreira de Sousa, 309','','50200-122','São Paulo','SP','(11) 2657-2935','',20000,'atendente');
insert into funcionario values ('tecnico1','Luan Cardoso Melo','Avenida Doutor Vicente Machado, 1629','apto. 91','50930-122','Ponta Grossa','PR','(42) 7659-4535','(42) 7659-6488',40000,'tecnico');
insert into funcionario values ('tecnico2','Kauê Melo Rocha','Rua da Coleirinha, 585','apto. 11','50560-122','Petrolina','PE','(87) 9465-4471','',40000,'tecnico');
insert into funcionario values ('tecnico3','Clara Azevedo Fernandes','Rua Leonardo Marcondes Gonzaga, 891','','50940-122','São Bernardo do Campo','SP','(11) 3980-7347','',40000,'tecnico');
insert into funcionario values ('tecnico4','Leila Dias Oliveira','Rua Santa Rita, 1121','','50910-122','Itabuna','BA','(73) 6216-6312','',40000,'tecnico');

insert into cliente values ('cliente1','Clara Barbosa Gomes','Rua Renato Leite e Silva, 1282','apto. 51 bloco A','50230-122','Rio de Janeiro','RJ','(21) 8184-6433','');
insert into cliente values ('cliente2','Anna Ribeiro Gomes','Rua Dez, 1659','','50456-122','Duque de Caxias','RJ','(21) 5173-4940','');
insert into cliente values ('cliente3','Leila Ferreira Araujo','2ª Travessa Manuel Salvador, 1845','apto. 51 bloco A','50909-122','Recife','PE','(81) 4519-5274','');
insert into cliente values ('cliente4','Kauan Oliveira Carvalho','Rua Diadema, 1596','','06396-140','Carapicuíba','SP','(11) 8742-9388','');
insert into cliente values ('cliente5','Aline Melo Almeida','Rua Daiana Cristina Cunha de Oliveira, 1335','','06140-182','Osasco','SP','(11) 4387-7174','');
insert into cliente values ('cliente6','Leonor Fernandes Azevedo','Rua Gerônimo Muraro, 138','apto. 91','82410-020','Curitiba','PR','(41) 4230-4500','');

insert into veiculo values ('660569059','FAQ-4312','Volkswagen','FOX 1.0','2012','cliente1');
insert into veiculo values ('305798627','BTG-3847','Fiat','Palio ELX 1.4','2009','cliente2');
insert into veiculo values ('899009531','POL-2256','Renault','Duster','2014','cliente3');
insert into veiculo values ('293359498','BEF-1847','Chevrolet','Astra','2009','cliente4');
insert into veiculo values ('735868371','CAR-3874','Ford','Focus','2013','cliente5');
insert into veiculo values ('491584678','BEQ-1432','Volvo','XC 90','2014','cliente6');

insert into mecanico (nome, end_rua, end_complemento, end_cep, end_cidade, end_estado, telefone_1, telefone_2, especialidade)
	values ('Paulo Gomes Cardoso','Rua Suzana Dias, 1571','','13300-045','Itu','SP','(11) 8129-7288','',0);
insert into mecanico (nome, end_rua, end_complemento, end_cep, end_cidade, end_estado, telefone_1, telefone_2, especialidade)
	values ('Leonor Silva Pereira','Rua Augusto José de Souza, 1468','','39801-392','Teófilo Otoni','MG','(33) 3475-5837','',1);
insert into mecanico (nome, end_rua, end_complemento, end_cep, end_cidade, end_estado, telefone_1, telefone_2, especialidade)
	values ('Julia Gomes Pinto','Travessa São João Batista, 352','','28027-325','Campos dos Goytacazes','RJ','(22) 9924-2984','',2);
insert into mecanico (nome, end_rua, end_complemento, end_cep, end_cidade, end_estado, telefone_1, telefone_2, especialidade)
	values ('Bruno Martins Correia','Rua Maria Antonieta, 439','','55018-480','Caruaru','PE','(81) 9281-3043','',3);
insert into mecanico (nome, end_rua, end_complemento, end_cep, end_cidade, end_estado, telefone_1, telefone_2, especialidade)
	values ('Kauan Rodrigues Araujo','Rua Doutor Gonçalves Lima, 640','','21555-500','Rio de Janeiro','RJ','(21) 5909-2519','',4);
insert into mecanico (nome, end_rua, end_complemento, end_cep, end_cidade, end_estado, telefone_1, telefone_2, especialidade)
	values ('Isabela Pinto Fernandes','Rua Doutor Romeu Marra da Silva, 1230','','24358-510','Niterói','RJ','(21) 5148-9846','',5);

insert into tipo_servico (nome, descricao, especialidade, valor_mao_obra)
	values ('troca de óleo','troca de óleo do motor', 0, 100);
insert into tipo_servico (nome, descricao, especialidade, valor_mao_obra)
	values ('funilaria','conserto de amassados na carroceria', 1, 500);
insert into tipo_servico (nome, descricao, especialidade, valor_mao_obra)
	values ('eletrica','conserto de problemas relacionados a parte eletrica', 2, 300);
insert into tipo_servico (nome, descricao, especialidade, valor_mao_obra)
	values ('troca de lâmpada','troca de lampadas queimadas', 3, 100);
insert into tipo_servico (nome, descricao, especialidade, valor_mao_obra)
	values ('solda','serviços que requerem o uso de soldagem', 4, 500);
insert into tipo_servico (nome, descricao, especialidade, valor_mao_obra)
	values ('troca de peças','substituição de peças do veículo', 5, 1000);

insert into tipo_peca (nome, descricao, preco, quantidade)
	values ('radiador','', 1000, 50);

insert into tipo_peca (nome, descricao, preco, quantidade)
	values ('lampada','', 30, 100);

insert into tipo_peca (nome, descricao, preco, quantidade)
	values ('maçaneta','', 300, 10);

insert into tipo_peca (nome, descricao, preco, quantidade)
	values ('radiador','', 1000, 50);


insert into peca values ('215415455455-4785','11/08/17', 0, 1);
insert into peca values ('22454554-44555-55','27/10/20', 0, 1);
insert into peca values ('214545454545-4785','15/02/17', 0, 2);
insert into peca values ('123323255455-4785','17/01/18', 0, 2);
insert into peca values ('211221222255-4785','10/05/16', 0, 3);
insert into peca values ('215413335455-4785','11/08/18', 0, 3);
