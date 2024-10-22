	SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
	SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
	SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

	-- -----------------------------------------------------
	-- Schema mydb
	-- -----------------------------------------------------
	CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8;
	USE `mydb`;

	-- -----------------------------------------------------
	-- Table `mydb`.`ContatoInstitucional`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`ContatoInstitucional` (
	  `idContatoInstitucional` INT NOT NULL AUTO_INCREMENT,
	  `emailInstitucional` VARCHAR(45) NOT NULL,
	  `senha` VARCHAR(255) NOT NULL,  -- Adicionando a coluna senha
	  `tipoUsuario` VARCHAR(20) NOT NULL,
	  PRIMARY KEY (`idContatoInstitucional`),
	  UNIQUE INDEX `emailInstitucional_UNIQUE` (`emailInstitucional`)
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Pessoa`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Pessoa` (
	  `idPessoa` INT NOT NULL AUTO_INCREMENT,
	  `nome` VARCHAR(45) NOT NULL,
	  `dataNascimento` DATE NOT NULL,
	  `sexo` VARCHAR(45) NOT NULL,
	  `RG` VARCHAR(12) NOT NULL,
	  `CPF` VARCHAR(11) NULL,
	  `ContatoInstitucional_idContatoInstitucional` INT NOT NULL,
	  PRIMARY KEY (`idPessoa`),
	  UNIQUE INDEX `RG_UNIQUE` (`RG`),
	  INDEX `fk_Pessoa_ContatoInstitucional_idx` (`ContatoInstitucional_idContatoInstitucional`),
	  CONSTRAINT `fk_Pessoa_ContatoInstitucional`
		FOREIGN KEY (`ContatoInstitucional_idContatoInstitucional`)
		REFERENCES `mydb`.`ContatoInstitucional` (`idContatoInstitucional`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Aluno`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Aluno` (
	  `idAluno` INT NOT NULL AUTO_INCREMENT,
	  `RM` INT NOT NULL,
	  `Pessoa_idPessoa` INT NOT NULL,
	  PRIMARY KEY (`idAluno`),
	  UNIQUE INDEX `RM_UNIQUE` (`RM`),
	  INDEX `fk_Aluno_Pessoa_idx` (`Pessoa_idPessoa`),
	  CONSTRAINT `fk_Aluno_Pessoa`
		FOREIGN KEY (`Pessoa_idPessoa`)
		REFERENCES `mydb`.`Pessoa` (`idPessoa`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Contato`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Contato` (
	  `idContato` INT NOT NULL AUTO_INCREMENT,
	  `numeroCelular` VARCHAR(11) NOT NULL,
	  `emailPessoal` VARCHAR(45) NOT NULL,
	  `Pessoa_idPessoa` INT NOT NULL,
	  PRIMARY KEY (`idContato`),
	  UNIQUE INDEX `numeroCelular_UNIQUE` (`numeroCelular`),
	  UNIQUE INDEX `emailPessoal_UNIQUE` (`emailPessoal`),
	  INDEX `fk_Contato_Pessoa_idx` (`Pessoa_idPessoa`),
	  CONSTRAINT `fk_Contato_Pessoa`
		FOREIGN KEY (`Pessoa_idPessoa`)
		REFERENCES `mydb`.`Pessoa` (`idPessoa`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Redes Sociais`
	-- -----------------------------------------------------

	CREATE TABLE IF NOT EXISTS `mydb`.`RedesSociais` (
	  `idRedeSocial` INT NOT NULL AUTO_INCREMENT,
	  `tipoRedeSocial` VARCHAR(45) NOT NULL,  -- Ex: Facebook, Instagram, etc.
	  `url` VARCHAR(255) NOT NULL,
	  `Contato_idContato` INT NOT NULL,
	  PRIMARY KEY (`idRedeSocial`),
	  INDEX `fk_RedesSociais_Contato_idx` (`Contato_idContato`),
	  CONSTRAINT `fk_RedesSociais_Contato`
		FOREIGN KEY (`Contato_idContato`)
		REFERENCES `mydb`.`Contato` (`idContato`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Professor`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Professor` (
	  `idProfessor` INT NOT NULL AUTO_INCREMENT,
	  `Pessoa_idPessoa` INT NOT NULL,
	  PRIMARY KEY (`idProfessor`),
	  INDEX `fk_Professor_Pessoa_idx` (`Pessoa_idPessoa`),
	  CONSTRAINT `fk_Professor_Pessoa`
		FOREIGN KEY (`Pessoa_idPessoa`)
		REFERENCES `mydb`.`Pessoa` (`idPessoa`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Cargo`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Cargo` (
	  `idCargo` INT NOT NULL AUTO_INCREMENT,
	  `nomeCargo` VARCHAR(45) NOT NULL,
	  PRIMARY KEY (`idCargo`)
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Funcionario`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Funcionario` (
	  `idFuncionario` INT NOT NULL AUTO_INCREMENT,
	  `ContatoInstitucional_idContatoInstitucional` INT NOT NULL,
	  `Contato_idContato` INT NOT NULL,
	  `Pessoa_idPessoa` INT NOT NULL,
	  `Cargo_idCargo` INT NOT NULL,
	  PRIMARY KEY (`idFuncionario`),
	  INDEX `fk_Funcionario_Pessoa_idx` (`Pessoa_idPessoa`),
	  INDEX `fk_Funcionario_Cargo_idx` (`Cargo_idCargo`),
	  CONSTRAINT `fk_Funcionario_Pessoa`
		FOREIGN KEY (`Pessoa_idPessoa`)
		REFERENCES `mydb`.`Pessoa` (`idPessoa`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	  CONSTRAINT `fk_Funcionario_Cargo`
		FOREIGN KEY (`Cargo_idCargo`)
		REFERENCES `mydb`.`Cargo` (`idCargo`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	  CONSTRAINT `fk_Funcionario_Contato`
		FOREIGN KEY (`Contato_idContato`)
		REFERENCES `mydb`.`Contato` (`idContato`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	  CONSTRAINT `fk_Funcionario_ContatoInstitucional`
		FOREIGN KEY (`ContatoInstitucional_idContatoInstitucional`)
		REFERENCES `mydb`.`ContatoInstitucional` (`idContatoInstitucional`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Turma`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Turma` (
	  `idTurma` INT NOT NULL AUTO_INCREMENT,
	  `nomeTurma` VARCHAR(45) NOT NULL,
	  PRIMARY KEY (`idTurma`),
	  UNIQUE INDEX `nomeTurma_UNIQUE` (`nomeTurma`)
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Aluno_has_Turma`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Aluno_has_Turma` (
	  `Aluno_idAluno` INT NOT NULL,
	  `Turma_idTurma` INT NOT NULL,
	  PRIMARY KEY (`Aluno_idAluno`, `Turma_idTurma`),
	  CONSTRAINT `fk_Aluno_has_Turma_Aluno`
		FOREIGN KEY (`Aluno_idAluno`)
		REFERENCES `mydb`.`Aluno` (`idAluno`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	  CONSTRAINT `fk_Aluno_has_Turma_Turma`
		FOREIGN KEY (`Turma_idTurma`)
		REFERENCES `mydb`.`Turma` (`idTurma`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Materia`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Materia` (
	  `idMateria` INT NOT NULL AUTO_INCREMENT,
	  `nomeMateria` VARCHAR(45) NOT NULL,
	  `Turma_idTurma` INT NOT NULL,
	  PRIMARY KEY (`idMateria`),
	  INDEX `fk_Materia_Turma_idx` (`Turma_idTurma`),
	  CONSTRAINT `fk_Materia_Turma`
		FOREIGN KEY (`Turma_idTurma`)
		REFERENCES `mydb`.`Turma` (`idTurma`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Materia_has_Professor`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Materia_has_Professor` (
	  `Materia_idMateria` INT NOT NULL,
	  `Professor_idProfessor` INT NOT NULL,
	  PRIMARY KEY (`Materia_idMateria`, `Professor_idProfessor`),
	  CONSTRAINT `fk_Materia_has_Professor_Materia`
		FOREIGN KEY (`Materia_idMateria`)
		REFERENCES `mydb`.`Materia` (`idMateria`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	  CONSTRAINT `fk_Materia_has_Professor_Professor`
		FOREIGN KEY (`Professor_idProfessor`)
		REFERENCES `mydb`.`Professor` (`idProfessor`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Endereco`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Endereco` (
	  `idEndereco` INT NOT NULL AUTO_INCREMENT,
	  `nomeEndereco` VARCHAR(45) NOT NULL,
	  `numeroEndereco` INT NOT NULL,
	  `complemento` VARCHAR(45) NULL,
	  `bairro` VARCHAR(45) NOT NULL,
	  `cidade` VARCHAR(45) NOT NULL,
	  `estado` VARCHAR(45) NOT NULL,
	  `CEP` VARCHAR(8) NOT NULL,
	  `Contato_idContato` INT NOT NULL,
	  PRIMARY KEY (`idEndereco`),
	  INDEX `fk_Endereco_Contato_idx` (`Contato_idContato`),
	  CONSTRAINT `fk_Endereco_Contato`
		FOREIGN KEY (`Contato_idContato`)
		REFERENCES `mydb`.`Contato` (`idContato`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Publicacao`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Publicacao` (
	  `idPublicacao` INT NOT NULL AUTO_INCREMENT,
	  `dataPublicacao` DATETIME NOT NULL,
	  `descricao` VARCHAR(100) NOT NULL,
	  `imagem` VARCHAR(45) NULL,
	  `Pessoa_idPessoa` INT NOT NULL,
	  PRIMARY KEY (`idPublicacao`),
	  INDEX `fk_Publicacao_Pessoa1_idx` (`Pessoa_idPessoa`),
	  CONSTRAINT `fk_Publicacao_Pessoa1`
		FOREIGN KEY (`Pessoa_idPessoa`)
		REFERENCES `mydb`.`Pessoa` (`idPessoa`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	) ENGINE = InnoDB;

	-- -----------------------------------------------------
	-- Table `mydb`.`Comentario`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Comentario` (
	  `idComentario` INT NOT NULL AUTO_INCREMENT,
	  `descricao` VARCHAR(100) NOT NULL,
	  `Pessoa_idPessoa` INT NOT NULL,
	  `Publicacao_idPublicacao` INT NOT NULL,
	  PRIMARY KEY (`idComentario`),
	  INDEX `fk_Comentario_Pessoa1_idx` (`Pessoa_idPessoa`),
	  INDEX `fk_Comentario_Publicacao1_idx` (`Publicacao_idPublicacao`),
	  CONSTRAINT `fk_Comentario_Pessoa1`
		FOREIGN KEY (`Pessoa_idPessoa`)
		REFERENCES `mydb`.`Pessoa` (`idPessoa`)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	  CONSTRAINT `fk_Comentario_Publicacao1`
		FOREIGN KEY (`Publicacao_idPublicacao`)
		REFERENCES `mydb`.`Publicacao` (`idPublicacao`)
		ON DELETE CASCADE
		ON UPDATE CASCADE
	) ENGINE = InnoDB;

	SET SQL_MODE=@OLD_SQL_MODE;
	SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
	SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

	-- INSERINDO TURMAS --

	INSERT INTO `mydb`.`Turma` (nomeTurma) VALUES
	('1 módulo - Administração - Tarde'), 
	('2 módulo - Administração - Tarde'), 
	('3 módulo - Administração - Tarde'),
	('1 módulo - Desenvolvimento de Sistema - Tarde'),
	('2 módulo - Desenvolvimento de Sistema - Tarde'),
	('3 módulo - Desenvolvimento de Sistema - Tarde'),
	('1 módulo - Logistica - Tarde'),
	('2 módulo - Logistica - Tarde'),
	('3 módulo - Logistica - Tarde'),
	('1 módulo - Administração - Noite'), 
	('2 módulo - Administração - Noite'), 
	('3 módulo - Administração - Noite'),
	('1 módulo - Desenvolvimento de Sistema - Noite'),
	('2 módulo - Desenvolvimento de Sistema - Noite'),
	('3 módulo - Desenvolvimento de Sistema - Noite'),
	('1 módulo - Logistica - Noite'),
	('2 módulo - Logistica - Noite'),
	('3 módulo - Logistica - Noite');

	select * from Turma;
				
	-- Inserir Aluno
	 
	INSERT INTO mydb.ContatoInstitucional (emailInstitucional, tipoUsuario) VALUES 
	('aluno1@etec.sp.gov.br', 'aluno');

	select * from ContatoInstitucional;

	INSERT INTO mydb.Pessoa (nome, dataNascimento, sexo, ContatoInstitucional_idContatoInstitucional, RG, CPF) VALUES 
	('Aluno Primeiro', '2000-01-01', 'Masculino', 1, '111111111', '11111111111');

	select * from Pessoa;

	INSERT INTO mydb.Aluno (RM, Pessoa_idPessoa) VALUES 
	(13967, 1);

	-- Preenchendo contatos para o usuário com id 1
	INSERT INTO mydb.Contato (numeroCelular, emailPessoal, Pessoa_idPessoa)
	VALUES ('11911111112', 'usuario1@gmail.com', 1);

	INSERT INTO mydb.RedesSociais (tipoRedeSocial, url, Contato_idContato)
	VALUES 
	('Facebook', 'https://facebook.com/usuario1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 1)),
	('Instagram', 'https://instagram.com/usuario1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 1)),
	('Linkedin', 'https://linkedin.com/usuario1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 1));

	-- Inserindo Gestores --

	INSERT INTO `mydb`.`Cargo` (`nomeCargo`) VALUES ('Diretor');

	INSERT INTO `mydb`.`ContatoInstitucional` (`emailInstitucional`, `tipoUsuario`)
	VALUES ('diretor1@etec.sp.gov.br', 'gestao');

	INSERT INTO `mydb`.`Pessoa` (`nome`, `dataNascimento`, `sexo`, `RG`, `CPF`, `ContatoInstitucional_idContatoInstitucional`)
	VALUES ('Diretor Primeiro', '2000-01-01', 'Masculino', '111111112', '11111111112', LAST_INSERT_ID());

	INSERT INTO `mydb`.`Contato` (`numeroCelular`, `emailPessoal`, `Pessoa_idPessoa`)
	VALUES ('11911111111', 'diretor1@gmail.com', LAST_INSERT_ID());

	INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`)
	VALUES (
		(SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'diretor1@etec.sp.gov.br'),
		(SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'diretor1@gmail.com'),
		(SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Diretor Primeiro'),
		(SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Diretor')
	);

	INSERT INTO mydb.RedesSociais (tipoRedeSocial, url, Contato_idContato)
	VALUES 
	('Facebook', 'https://facebook.com/diretor1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 2)),
	('Instagram', 'https://instagram.com/diretor1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 2)),
	('Linkedin', 'https://linkedin.com/diretor1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 2));

	select * from Pessoa;

	SELECT * FROM mydb.Pessoa WHERE idPessoa IN (1, 2);
	SELECT * FROM mydb.Contato WHERE Pessoa_idPessoa IN (1, 2);
	SELECT * FROM mydb.RedesSociais WHERE Contato_idContato IN (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa IN (1, 2));

	-- INSERIR ALUNO NA TURMA --

	select * from Turma;

	INSERT INTO mydb.Aluno_has_Turma (Aluno_idAluno, Turma_idTurma) VALUES 
	(1, 10); -- Aluno 1 na Turma 1

	SELECT 
		a.idAluno, 
		a.RM, 
		t.idTurma, 
		t.nomeTurma
	FROM 
		mydb.Aluno a
	JOIN 
		mydb.Aluno_has_Turma at ON a.idAluno = at.Aluno_idAluno
	JOIN 
		mydb.Turma t ON at.Turma_idTurma = t.idTurma;
        
SELECT 
    p.nome AS NomeAluno, 
    MIN(ci.emailInstitucional) AS EmailInstitucional  -- Usamos MIN para garantir que apenas um email por aluno seja retornado
FROM 
    mydb.Aluno a
JOIN 
    mydb.Pessoa p ON a.Pessoa_idPessoa = p.idPessoa
JOIN 
    mydb.Aluno_has_Turma at ON a.idAluno = at.Aluno_idAluno
JOIN 
    mydb.Turma t ON at.Turma_idTurma = t.idTurma
JOIN 
    mydb.Contato c ON p.idPessoa = c.Pessoa_idPessoa
JOIN 
    mydb.ContatoInstitucional ci ON c.Pessoa_idPessoa = p.idPessoa
WHERE 
    t.idTurma IS NOT NULL  -- Garante que os alunos estão em alguma turma
GROUP BY 
    p.nome;  -- Agrupamos pelo nome do aluno para evitar duplicações
