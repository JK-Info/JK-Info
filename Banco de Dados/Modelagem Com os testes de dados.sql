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
	  `senha` VARCHAR(255) NOT NULL,
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
  `dataPublicacao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `descricao` VARCHAR(255) NOT NULL,
  `imagem` VARCHAR(255) NULL,
  `Pessoa_idPessoa` INT NOT NULL,
  PRIMARY KEY (`idPublicacao`),
  CONSTRAINT `fk_Publicacao_Pessoa`
    FOREIGN KEY (`Pessoa_idPessoa`)
    REFERENCES `mydb`.`Pessoa` (`idPessoa`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

select * from Publicacao;
	-- -----------------------------------------------------
	-- Table `mydb`.`Comentario`
	-- -----------------------------------------------------
	CREATE TABLE IF NOT EXISTS `mydb`.`Comentario` (
  `idComentario` INT NOT NULL AUTO_INCREMENT,
  `texto` TEXT NOT NULL,
  `dataComentario` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Publicacao_idPublicacao` INT NOT NULL,
  `Pessoa_idPessoa` INT NOT NULL,
  PRIMARY KEY (`idComentario`),
  CONSTRAINT `fk_Comentario_Publicacao`
    FOREIGN KEY (`Publicacao_idPublicacao`)
    REFERENCES `mydb`.`Publicacao` (`idPublicacao`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Comentario_Pessoa`
    FOREIGN KEY (`Pessoa_idPessoa`)
    REFERENCES `mydb`.`Pessoa` (`idPessoa`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

	SET SQL_MODE=@OLD_SQL_MODE;
	SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
	SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

	-- INSERINDO TURMAS -----------------------------------

	INSERT INTO `mydb`.`Turma` (`nomeTurma`) VALUES
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
				
	-- INSERINDO ALUNOS -----------------------------------------------------------
    
    INSERT INTO mydb.`ContatoInstitucional`(`emailInstitucional`, `senha`, `tipoUsuario`) VALUES 
    ('aluno1@etec.sp.gov.br', default, 'aluno'),
	('aluno2@etec.sp.gov.br', default, 'aluno'),
	('aluno3@etec.sp.gov.br', default, 'aluno'),
	('aluno4@etec.sp.gov.br', default, 'aluno'),
	('aluno5@etec.sp.gov.br', default, 'aluno'),
	('aluno6@etec.sp.gov.br', default, 'aluno'),
	('aluno7@etec.sp.gov.br', default, 'aluno'),
	('aluno8@etec.sp.gov.br', default, 'aluno'),
	('aluno9@etec.sp.gov.br', default, 'aluno'),
	('aluno10@etec.sp.gov.br', default, 'aluno'),
	('aluno11@etec.sp.gov.br', default, 'aluno'),
	('aluno12@etec.sp.gov.br', default, 'aluno'),
	('aluno13@etec.sp.gov.br', default, 'aluno'),
	('aluno14@etec.sp.gov.br', default, 'aluno'),
	('aluno15@etec.sp.gov.br', default, 'aluno'),
	('aluno16@etec.sp.gov.br', default, 'aluno'),
	('aluno17@etec.sp.gov.br', default, 'aluno'),
    ('aluno18@etec.sp.gov.br', default, 'aluno'),
    ('aluno19@etec.sp.gov.br', default, 'aluno'),
    ('aluno20@etec.sp.gov.br', default, 'aluno');
    
    INSERT INTO mydb.Pessoa (`nome`, `dataNascimento`, `sexo`, `ContatoInstitucional_idContatoInstitucional`, `RG`, `CPF`) VALUES 
    ('Aluno Primeiro', '2000-01-01', 'Masculino', 1, '111111111', '11111111111'),
	('Aluno Segundo', '2000-01-01', 'Feminino', 2, '111111112', '11111111112'),
	('Aluno Terceiro', '2000-01-01', 'Feminino', 3, '111111113', '11111111113'),
	('Aluno Quarto', '2000-01-01', 'Masculino', 4, '111111114', '11111111114'),
	('Aluno Quinto', '2000-01-01', 'Masculino', 5, '111111115', '11111111115'),
	('Aluno Sexto', '2000-01-01', 'Feminino', 6, '111111116', '11111111116'),
	('Aluno Sétimo', '2000-01-01', 'Masculino', 7, '111111117', '11111111117'),
	('Aluno Oitavo', '2000-01-01', 'Masculino', 8, '111111118', '11111111118'),
	('Aluno Nono', '2000-01-01', 'Feminino', 9, '111111119', '11111111119'),
    ('Aluno Décimo', '2000-01-01', 'Feminino', 10, '111111120', '11111111120'),
	('Aluno Décimo Primeiro', '2000-01-01', 'Masculino', 11, '111111121', '11111111121'),
	('Aluno Décimo Segundo', '2000-01-01', 'Feminino', 12, '111111122', '11111111122'),
	('Aluno Décimo Terceiro', '2000-01-01', 'Feminino', 13, '111111123', '11111111123'),
	('Aluno Décimo Quarto', '2000-01-01', 'Masculino', 14, '111111124', '11111111124'),
	('Aluno Décimo Quinto', '2000-01-01', 'Feminino', 15, '111111125', '11111111125'),
	('Aluno Décimo Sexto', '2000-01-01', 'Masculino', 16, '111111126', '11111111126'),
	('Aluno Décimo Sétimo', '2000-01-01', 'Feminino', 17, '111111127', '11111111127'),
	('Aluno Décimo Oitavo', '2000-01-01', 'Masculino', 18, '111111128', '11111111128'),
    ('Aluno Décimo Nono', '2000-01-01', 'Feminino', 19, '111111129', '11111111129'),
    ('Aluno Vigésimo', '2000-01-01', 'Feminino', 20, '111111130', '11111111130');
    
    INSERT INTO mydb.Aluno (`RM`, `Pessoa_idPessoa`) VALUES 
    (11111, 1),
	(11112, 2),
	(11113, 3),
	(11114, 4),
	(11115, 5),
	(11116, 6),
	(11117, 7),
	(11118, 8),
	(11119, 9),
	(11120, 10),
	(11121, 11),
	(11122, 12),
	(11123, 13),
	(11124, 14),
	(11125, 15),
	(11126, 16),
	(11127, 17),
    (11128, 18),
	(11129, 19),
    (11130, 20);

	-- INSERINDO CONTATOS DO ALUNO -----------------------------------------------------------------------------------
    
    INSERT INTO mydb.Contato (`numeroCelular`, `emailPessoal`, `Pessoa_idPessoa`)
	VALUES 
	('11911111111', 'aluno1@gmail.com', 1),
	('11911111112', 'aluno2@gmail.com', 2),
	('11911111113', 'aluno3@gmail.com', 3),
	('11911111114', 'aluno4@gmail.com', 4),
	('11911111115', 'aluno5@gmail.com', 5),
	('11911111116', 'aluno6@gmail.com', 6),
	('11911111117', 'aluno7@gmail.com', 7),
	('11911111118', 'aluno8@gmail.com', 8),
	('11911111119', 'aluno9@gmail.com', 9),
	('11911111120', 'aluno10@gmail.com', 10),
	('11911111121', 'aluno11@gmail.com', 11),
	('11911111122', 'aluno12@gmail.com', 12),
	('11911111123', 'aluno13@gmail.com', 13),
	('11911111124', 'aluno14@gmail.com', 14),
	('11911111125', 'aluno15@gmail.com', 15),
	('11911111126', 'aluno16@gmail.com', 16),
    ('11911111127', 'aluno17@gmail.com', 17),
    ('11911111128', 'aluno18@gmail.com', 18),
    ('11911111129', 'aluno19@gmail.com', 19),
    ('11911111130', 'aluno20@gmail.com', 20);
    
    -- INSERINDO REDES SOCIAIS DO ALUNO -------------------------------------------------------------------------
	/*
	INSERT INTO mydb.RedesSociais (tipoRedeSocial, url, Contato_idContato)
	VALUES 
	('Facebook', 'https://facebook.com/usuario1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 1)),
	('Instagram', 'https://instagram.com/usuario1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 1)),
	('Linkedin', 'https://linkedin.com/usuario1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 1));
    */
    -- INSERIR ALUNO NA TURMA ---------------------------------------------

    INSERT INTO mydb.Aluno_has_Turma (Aluno_idAluno, Turma_idTurma) VALUES 
	(1, 1),
	(2, 2),
	(3, 3),
	(4, 4),
	(5, 5),
	(6, 6),
	(7, 7),
	(8, 8),
	(9, 9),
	(10, 10),
	(11, 11),
	(12, 12),
	(13, 13),
	(14, 14),
	(15, 15),
	(16, 16),
    (17, 17),
    (18, 18),
    (19, 1),
    (20, 2);
    
	-- INSERINDO GESTORES ------------------------------------------------------------

	INSERT INTO `mydb`.`Cargo` (`nomeCargo`) VALUES 
    ('Diretor'),
    ('Diretora'),
    ('Vice-Diretor'),
    ('Vice-Diretora'),
    ('Coordenador'),
    ('Coordenadora'),
    ('Vice-Coordenador'),
    ('Vice-Coordenadora');

	INSERT INTO `mydb`.`ContatoInstitucional` (`emailInstitucional`, `senha`, `tipoUsuario`) VALUES 
    ('diretor1@etec.sp.gov.br', default, 'gestao'),
    ('vice-diretor1@etec.sp.gov.br', default, 'gestao'),
    ('coordenador1@etec.sp.gov.br', default, 'gestao'),
    ('vice-coordenador1@etec.sp.gov.br', default, 'gestao');

	INSERT INTO `mydb`.`Pessoa` (`nome`, `dataNascimento`, `sexo`, `RG`, `CPF`, `ContatoInstitucional_idContatoInstitucional`) VALUES 
    ('Diretor Primeiro', '1985-01-01', 'Masculino', '111111131', '11111111131', 21),
    ('Vice Diretor Primeiro', '1985-01-01', 'Masculino', '111111132', '11111111132', 22),
    ('Coordenador Primeiro', '1985-01-01', 'Masculino', '111111133', '11111111133', 23),
    ('Vice Coordenador Primeiro', '1985-01-01', 'Masculino', '111111134', '11111111134', 24);

	INSERT INTO `mydb`.`Contato` (`numeroCelular`, `emailPessoal`, `Pessoa_idPessoa`) VALUES 
    ('11911111131', 'diretor1@gmail.com', 21),
    ('11911111132', 'vice-diretor1@gmail.com', 22),
    ('11911111133', 'coordenador1@gmail.com', 23),
    ('11911111134', 'vice-coordenador1@gmail.com', 24);
     
	INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`)
	VALUES 
    (
        (SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'diretor1@etec.sp.gov.br'),
        (SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'diretor1@gmail.com'),
        (SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Diretor Primeiro'),
        (SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Diretor')
    );
    
    INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`)
	VALUES 
    (
        (SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'vice-diretor1@etec.sp.gov.br'),
        (SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'vice-diretor1@gmail.com'),
        (SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Vice Diretor Primeiro'),
        (SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Vice-Diretor')
    );
    
    INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`)
	VALUES 
    (
        (SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'coordenador1@etec.sp.gov.br'),
        (SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'coordenador1@gmail.com'),
        (SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Coordenador Primeiro'),
        (SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Coordenador')
    );
    
    INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`)
	VALUES 
    (
        (SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'vice-coordenador1@etec.sp.gov.br'),
        (SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'vice-coordenador1@gmail.com'),
        (SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Vice Coordenador Primeiro'),
        (SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Vice-Coordenador')
    );

/*
	INSERT INTO mydb.RedesSociais (tipoRedeSocial, url, Contato_idContato)
	VALUES 
	('Facebook', 'https://facebook.com/diretor1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 2)),
	('Instagram', 'https://instagram.com/diretor1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 2)),
	('Linkedin', 'https://linkedin.com/diretor1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 2));
  */
  
    	-- INSERINDO PROFESSORES ------------------------------------------------------------

	INSERT INTO `mydb`.`Cargo` (`nomeCargo`) VALUES 
    ('Professor'),
    ('Professora');

	INSERT INTO `mydb`.`ContatoInstitucional` (`emailInstitucional`, `senha`, `tipoUsuario`)
	VALUES
    ('professor1@etec.sp.gov.br', default, 'professor'),
    ('professor2@etec.sp.gov.br', default, 'professora'),
    ('professor3@etec.sp.gov.br', default, 'professor'),
    ('professor4@etec.sp.gov.br', default, 'professora');
    
	INSERT INTO `mydb`.`Pessoa` (`nome`, `dataNascimento`, `sexo`, `RG`, `CPF`, `ContatoInstitucional_idContatoInstitucional`)
	VALUES 
    ('Professor Primeiro', '1985-01-01', 'Masculino', '111111135', '11111111135', 25),
    ('Professor Segundo', '1985-01-01', 'Feminino', '111111136', '11111111136', 26),
    ('Professor Terceiro', '1985-01-01', 'Masculino', '111111137', '11111111137', 27),
    ('Professor Quarto', '1985-01-01', 'Feminino', '111111138', '11111111138', 28);

	INSERT INTO `mydb`.`Contato` (`numeroCelular`, `emailPessoal`, `Pessoa_idPessoa`)
	VALUES 
    ('11911111135', 'professor1@gmail.com', 29),
    ('11911111136', 'professor2@gmail.com', 30),
    ('11911111137', 'professor3@gmail.com', 31),
    ('11911111138', 'professor4@gmail.com', 32);

	INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`) 
	VALUES (
		(SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'professor1@etec.sp.gov.br' LIMIT 1),
		(SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'professor1@gmail.com' LIMIT 1),
		(SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Professor Primeiro' LIMIT 1),
		(SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Professor' LIMIT 1)
);

    INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`)
	VALUES (
		(SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'professor2@etec.sp.gov.br'  LIMIT 1),
		(SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'professor2@gmail.com'  LIMIT 1),
		(SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Professor Segundo' LIMIT 1),
		(SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Professora'  LIMIT 1)
	);
    
    INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`)
	VALUES (
		(SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'professor3@etec.sp.gov.br'  LIMIT 1),
		(SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'professor3@gmail.com'  LIMIT 1),
		(SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Professor Terceiro'  LIMIT 1),
		(SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Professor' LIMIT 1)
	);
    
    INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`)
	VALUES (
		(SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'professor4@etec.sp.gov.br' LIMIT 1),
		(SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'professor4@gmail.com' LIMIT 1),
		(SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Professor Quarto' LIMIT 1),
		(SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Professora'  LIMIT 1)
	);
	
    /*
	INSERT INTO mydb.RedesSociais (tipoRedeSocial, url, Contato_idContato)
	VALUES 
	('Facebook', 'https://facebook.com/professor1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 3)),
	('Instagram', 'https://instagram.com/professor1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 3)),
	('Linkedin', 'https://linkedin.com/professor1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 3));
    */
    
    -- INSERINDO FUNCIONARIOS ------------------------------------------------------------

	INSERT INTO `mydb`.`Cargo` (`nomeCargo`) VALUES ('Funcionario');

	INSERT INTO `mydb`.`ContatoInstitucional` (`emailInstitucional`, `senha`, `tipoUsuario`)
	VALUES ('funcionario1@etec.sp.gov.br', default, 'funcionario');

	INSERT INTO `mydb`.`Pessoa` (`nome`, `dataNascimento`, `sexo`, `RG`, `CPF`, `ContatoInstitucional_idContatoInstitucional`)
	VALUES ('Funcionario Primeiro', '1985-01-01', 'Masculino', '111111139', '11111111139', 29);

	INSERT INTO `mydb`.`Contato` (`numeroCelular`, `emailPessoal`, `Pessoa_idPessoa`)
	VALUES ('11911111139', 'funcionario1@gmail.com', 41);

	INSERT INTO `mydb`.`Funcionario` (`ContatoInstitucional_idContatoInstitucional`, `Contato_idContato`, `Pessoa_idPessoa`, `Cargo_idCargo`)
	VALUES (
		(SELECT idContatoInstitucional FROM `mydb`.`ContatoInstitucional` WHERE emailInstitucional = 'funcionario1@etec.sp.gov.br' LIMIT 1),
		(SELECT idContato FROM `mydb`.`Contato` WHERE emailPessoal = 'funcionario1@gmail.com' LIMIT 1),
		(SELECT idPessoa FROM `mydb`.`Pessoa` WHERE nome = 'Funcionario Primeiro' LIMIT 1),
		(SELECT idCargo FROM `mydb`.`Cargo` WHERE nomeCargo = 'Funcionario' LIMIT 1)
	);
	
    /*
	INSERT INTO mydb.RedesSociais (tipoRedeSocial, url, Contato_idContato)
	VALUES 
	('Facebook', 'https://facebook.com/funcionario1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 4)),
	('Instagram', 'https://instagram.com/funcionario1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 4)),
	('Linkedin', 'https://linkedin.com/funcionario1', (SELECT idContato FROM mydb.Contato WHERE Pessoa_idPessoa = 4));
