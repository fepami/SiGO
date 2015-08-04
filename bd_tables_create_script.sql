create table tipo_peca
(
	id 			serial				primary key,
	nome 		varchar(150),
	descricao 	varchar(300),
	preco 		real,
	quantidade 	int
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
	id_tipo_servico	int				references tipo_servico(id),
	numero_os		int				references os(numero_os)
);

create table peca
(
	numero_serie	varchar(100)	primary key,
	validade		varchar(12),
	status			int,
	id_tipo_peca	int				references tipo_peca(id),
	servico_id		int 			references servico(id)
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
	email			varchar(100)	UNIQUE,
	salt			varchar(200),
	hash			varchar(300),
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
	renavam			bigint			primary key,
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
	hora			int,
status			int,
	renavam_veiculo	int				references veiculo(renavam)
);

create table equipe_mecanico
(
	codigo_mecanico_1	int	 		references mecanico(codigo_mecanico),
	codigo_mecanico_2	int			references mecanico(codigo_mecanico),
	id_equipe			int			references equipe(id),
	primary key (codigo_mecanico_1, codigo_mecanico_2, id_equipe)
);