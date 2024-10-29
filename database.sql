create database SiteDeploy;
use SiteDeploy;

create table usuario(
    id_usuario int not null primary key auto_increment,
    nomeUsuario varchar(500) not null,
    email varchar(500) not null unique,
    senha varchar(20) not null unique
);

create table produtos(
    id_produtos int not null primary key auto_increment,
    nomeProduto varchar(500) not null,
    precoProdutos float not null,
    descricao text not null,
    qtdDisponivel float
);