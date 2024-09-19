SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE mydb ;

-- -----------------------------------------------------
-- Table `mydb`.`ContatoInstitucional`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`ContatoInstitucional` (
  `idContatoInstitucional` INT NOT NULL AUTO_INCREMENT,
  `emailInstituicional` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idContatoInstitucional`),
  UNIQUE INDEX `emailInstituicional_UNIQUE` (`emailInstituicional`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`Pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pessoa` (
  `idPessoa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `dataNacimento` DATE NOT NULL,
  `sexo` VARCHAR(45) NOT NULL,
  `ContatoInstitucional_idContatoInstitucional` INT NOT NULL,
  `RG` VARCHAR(12) NOT NULL,
  `CPF` VARCHAR(12) NULL,
  PRIMARY KEY (`idPessoa`),
  UNIQUE INDEX `RG_UNIQUE` (`RG`),
  INDEX `fk_Pessoa_ContatoInstitucional1_idx` (`ContatoInstitucional_idContatoInstitucional`),
  CONSTRAINT `fk_Pessoa_ContatoInstitucional1`
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
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
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
  INDEX `fk_Contato_Pessoa1_idx` (`Pessoa_idPessoa`),
  CONSTRAINT `fk_Contato_Pessoa1`
    FOREIGN KEY (`Pessoa_idPessoa`)
    REFERENCES `mydb`.`Pessoa` (`idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Professor` (
  `idProfessor` INT NOT NULL AUTO_INCREMENT,
  `Pessoa_idPessoa` INT NOT NULL,
  PRIMARY KEY (`idProfessor`),
  INDEX `fk_Professor_Pessoa1_idx` (`Pessoa_idPessoa`),
  CONSTRAINT `fk_Professor_Pessoa1`
    FOREIGN KEY (`Pessoa_idPessoa`)
    REFERENCES `mydb`.`Pessoa` (`idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
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
  INDEX `fk_Funcionario_Pessoa1_idx` (`Pessoa_idPessoa`),
  INDEX `fk_Funcionario_Cargo1_idx` (`Cargo_idCargo`),
  CONSTRAINT `fk_Funcionario_Pessoa1`
    FOREIGN KEY (`Pessoa_idPessoa`)
    REFERENCES `mydb`.`Pessoa` (`idPessoa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Funcionario_Cargo1`
    FOREIGN KEY (`Cargo_idCargo`)
    REFERENCES `mydb`.`Cargo` (`idCargo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Funcionario_Contato1`
    FOREIGN KEY (`Contato_idContato` )
    REFERENCES `mydb`.`Contato` (`idContato` )
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  constraint `fk_Funcionario_ContatoInstitucional1`
	foreign key (`ContatoInstitucional_idContatoInstitucional`)
    references `mydb`. `ContatoInstitucional` (`idContatoInstitucional`)
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
  `Aluno_Pessoa_idPessoa` INT NOT NULL,
  `Turma_idTurma` INT NOT NULL,
  PRIMARY KEY (`Aluno_idAluno`, `Aluno_Pessoa_idPessoa`, `Turma_idTurma`),
  INDEX `fk_Aluno_has_Turma_Turma1_idx` (`Turma_idTurma`),
  INDEX `fk_Aluno_has_Turma_Aluno1_idx` (`Aluno_idAluno`),
  CONSTRAINT `fk_Aluno_has_Turma_Aluno1`
    FOREIGN KEY (`Aluno_idAluno`)
    REFERENCES `mydb`.`Aluno` (`idAluno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Aluno_has_Turma_Turma1`
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
  INDEX `fk_Materia_Turma1_idx` (`Turma_idTurma`),
  CONSTRAINT `fk_Materia_Turma1`
    FOREIGN KEY (`Turma_idTurma`)
    REFERENCES `mydb`.`Turma` (`idTurma`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Materia_has_Professor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Materia_has_Professor` (
  `Materia_idMateria` INT NOT NULL,
  `Materia_Turma_idTurma` INT NOT NULL,
  `Professor_idProfessor` INT NOT NULL,
  `Professor_Pessoa_idPessoa` INT NOT NULL,
  PRIMARY KEY (`Materia_idMateria`, `Materia_Turma_idTurma`, `Professor_idProfessor`, `Professor_Pessoa_idPessoa`),
  INDEX `fk_Materia_has_Professor_Professor1_idx` (`Professor_idProfessor` ASC, `Professor_Pessoa_idPessoa` ASC) ,
  INDEX `fk_Materia_has_Professor_Materia1_idx` (`Materia_idMateria` ASC, `Materia_Turma_idTurma` ASC) ,
  CONSTRAINT `fk_Materia_has_Professor_Materia1`
    FOREIGN KEY (`Materia_idMateria`)
    REFERENCES `mydb`.`Materia` (`idMateria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
 constraint `fk_Materia_has_Professor_Turma`
    foreign key (`Materia_Turma_idTurma`)
    references `mydb`. `Turma` (`idTurma`)
    on delete no action
    on update no action,
  CONSTRAINT `fk_Materia_has_Professor_Professor1`
    FOREIGN KEY (`Professor_idProfessor`)
    REFERENCES `mydb`.`Professor` (`idProfessor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    constraint `fk_Materia_has_Professor_Pessoa`
    foreign key (`Professor_Pessoa_idPessoa`)
    references `mydb`. `Pessoa`(`idPessoa`)
    on update no action
    on delete no action)
ENGINE = InnoDB;

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
  `CEP` INT(8) NOT NULL,
  `Contato_idContato` INT NOT NULL,
  `Contato_Pessoa_idPessoa` INT NOT NULL,
  PRIMARY KEY (`idEndereco`, `Contato_idContato`, `Contato_Pessoa_idPessoa`),
  INDEX `fk_Endereco_Contato1_idx` (`Contato_idContato` ASC, `Contato_Pessoa_idPessoa` ASC) ,
  CONSTRAINT `fk_Endereco_Contato1`  
    FOREIGN KEY (`Contato_idContato`)
    REFERENCES `mydb`.`Contato` (`idContato`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    constraint `fk_Endereco_Pessoa`
    foreign key ( `Contato_Pessoa_idPessoa`)
    references `mydb`. `Pessoa` (`idPessoa`)
    on update no action
    on delete no action
    )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `mydb`.`RedeSocial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`RedeSocial` (
  `idRedeSocial` INT NOT NULL AUTO_INCREMENT,
  `redeSocial` VARCHAR(45) NOT NULL,
  `Contato_idContato` INT NOT NULL,
  `Contato_Pessoa_idPessoa` INT NOT NULL,
  PRIMARY KEY (`idRedeSocial`, `Contato_idContato`, `Contato_Pessoa_idPessoa`),
  INDEX `fk_RedeSocial_Contato1_idx` (`Contato_idContato` ASC, `Contato_Pessoa_idPessoa` ASC) ,
  CONSTRAINT `fk_RedeSocial_Contato1`
    FOREIGN KEY (`Contato_idContato`)
    REFERENCES `mydb`.`Contato` (`idContato` )
    ON DELETE NO ACTION
    ON UPDATE CASCADE,
    constraint `fk_RedeSocial_Pessoa`
    foreign key (`Contato_Pessoa_idPessoa`)
    references `mydb`. `Pessoa`(`idPessoa`)
    on delete no action
    on update cascade)
ENGINE = InnoDB;

- -----------------------------------------------------
-- Table `mydb`.`Cardapio`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Cardapio` (
  `idCardapio` INT NOT NULL AUTO_INCREMENT,
  `diaSemana` VARCHAR(45) NOT NULL,
  `refeicao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCardapio`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

				-- ALUNOS --

-- Inserir dados na tabela ContatoInstitucional
INSERT INTO mydb.ContatoInstitucional (emailInstituicional) VALUES 
('contato1@exemplo.com'), 
('contato2@exemplo.com');

-- Inserir dados na tabela Pessoa
INSERT INTO mydb.Pessoa (nome, dataNacimento, sexo, ContatoInstitucional_idContatoInstitucional, RG, CPF) VALUES 
('João Silva', '2000-01-15', 'Masculino', 1, '123456789', '12345678901'), 
('Maria Oliveira', '1999-06-20', 'Feminino', 2, '987654321', '10987654321'),
('Mario Oliveira', '2000-12-20', 'Maculino', 5, '458791111', '000000000');

-- Inserir dados na tabela Turma
INSERT INTO mydb.Turma (nomeTurma) VALUES 
('Turma A'), 
('Turma B');

-- Inserir dados na tabela Aluno
INSERT INTO mydb.Aluno (RM, Pessoa_idPessoa) VALUES 
(1001, 1),  -- João Silva
(1002, 2);  -- Maria Oliveira

select * from mydb.Aluno;

-- Esse select junta as tabelas aluno, pessoa e CInstitucional.
SELECT 
    a.idAluno, 
    a.RM, 
    p.nome AS NomeAluno,
    p.dataNacimento, 
    p.sexo,
    ci.emailInstituicional
FROM 
    mydb.Aluno a
JOIN 
    mydb.Pessoa p ON a.Pessoa_idPessoa = p.idPessoa
JOIN 
    mydb.ContatoInstitucional ci ON p.ContatoInstitucional_idContatoInstitucional = ci.idContatoInstitucional;

-- Esse select mostra as tabelas pessoa e cInstitucional. 
SELECT 
    p.idPessoa, 
    p.nome, 
    p.dataNacimento, 
    p.sexo, 
    ci.emailInstituicional
FROM 
    mydb.Pessoa p
JOIN 
    mydb.ContatoInstitucional ci ON p.ContatoInstitucional_idContatoInstitucional = ci.idContatoInstitucional;

-- Esse select mostra a tabela da turma eas informações nela. 
SELECT 
    t.idTurma, 
    t.nomeTurma 
FROM 
    mydb.Turma t;

			-- FIM TESTE DE ALUNOS --
            
            -- TESTE FUNCIONARIOS --
                       
INSERT INTO mydb.Contato (numeroCelular, emailPessoal, Pessoa_idPessoa) VALUES 
('11987654321', 'joao.silva@exemplo.com', 1),  
('11912345678', 'maria.oliveira@exemplo.com', 2); 

INSERT INTO mydb.Cargo (nomeCargo) VALUES 
('Professor'), 
('Coordenador');

INSERT INTO mydb.Funcionario (ContatoInstitucional_idContatoInstitucional, Contato_idContato, Pessoa_idPessoa, Cargo_idCargo) VALUES 
(1, 1, 1, 1),  -- João Silva, contato institucional 1, contato 1, cargo 1 (Professor)
(1, 2, 2, 2);  -- Maria Oliveira, contato institucional 1, contato 2, cargo 2 (Coordenador)

SELECT * FROM mydb.Funcionario;

 -- Selecionar Dados dos Funcionários
Select 
f.idFuncionario,
p.nome as NomeFuncionario,
c.nomeCargo AS Cargo,
co.numeroCelular AS NumeroCelular,
co.emailPessoal AS EmailPessoal
from
mydb.Funcionario f
inner join
mydb.Pessoa p on f.Pessoa_idPessoa = p.idPessoa
inner join
mydb.Cargo c on f.Cargo_idCargo = c.idCargo
inner join
mydb.Contato co on f.Contato_idContato = co.idContato;

-- Selecionar Dados de Todos os Funcionários, Mesmo sem Contato Pessoal --
SELECT 
    f.idFuncionario, 
    p.nome AS NomeFuncionario,
    c.nomeCargo AS Cargo,
    co.numeroCelular AS NumeroCelular,
    co.emailPessoal AS EmailPessoal
FROM 
    mydb.Funcionario f
LEFT JOIN 
    mydb.Pessoa p ON f.Pessoa_idPessoa = p.idPessoa
LEFT JOIN 
    mydb.Contato co ON f.Contato_idContato = co.idContato
LEFT JOIN 
    mydb.Cargo c ON f.Cargo_idCargo = c.idCargo;
    
-- Selecionar Apenas Funcionários com Contato Institucional
SELECT 
    f.idFuncionario, 
    p.nome AS NomeFuncionario,
    ci.emailInstituicional AS EmailInstitucional,
    c.nomeCargo AS Cargo
FROM 
    mydb.Funcionario f
INNER JOIN 
    mydb.Pessoa p ON f.Pessoa_idPessoa = p.idPessoa
INNER JOIN 
    mydb.ContatoInstitucional ci ON p.ContatoInstitucional_idContatoInstitucional = ci.idContatoInstitucional
INNER JOIN 
    mydb.Cargo c ON f.Cargo_idCargo = c.idCargo;
					
                    -- FIM TESTE FUNCIONARIOS--
