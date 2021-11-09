import {ExerciseSeed} from "../seed/exercise.seed";
import {getRepository, MigrationInterface, QueryRunner} from "typeorm";

export class generate1635827197730 implements MigrationInterface {
    name = 'generate1635827197730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`feedback\` (\`id\` int NOT NULL AUTO_INCREMENT, \`difficulty\` enum ('EASY', 'NORMAL', 'HARD') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NOT NULL, \`exerciseHistoryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nickname\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`googleAccount\` varchar(255) NULL, \`gender\` enum ('MALE', 'FEMALE') NULL, \`age\` int UNSIGNED NULL, \`height\` int UNSIGNED NULL, \`weight\` int UNSIGNED NULL, \`healthStyle\` enum ('FULL_BODY_WORKOUT', 'SPLIT_3_DAY_WORKOUT', 'SPLIT_5_DAY_WORKOUT') NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_ec0b5b4045a9b6f42ccb2f6acc\` (\`googleAccount\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`exercise\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`part\` enum ('LOWER', 'BACK', 'CHEST', 'SHOULDER', 'BICEPS', 'TRICEPS') NOT NULL, \`baseCount\` int NOT NULL, \`setCount\` int NOT NULL, \`startWeight\` int NOT NULL, \`changeWeight\` int NOT NULL, \`setBreakTime\` int NOT NULL, \`breakTime\` int NOT NULL, \`imageLink\` varchar(255) NOT NULL, \`priority\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`set\` (\`id\` int NOT NULL AUTO_INCREMENT, \`index\` int NOT NULL, \`weight\` int NOT NULL, \`startTime\` datetime NOT NULL, \`finishTime\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`exerciseHistoryId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`hell_ta_bus\`.\`exercise-history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`startTime\` datetime NOT NULL, \`finishTime\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`userId\` int NULL, \`exerciseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`feedback\` ADD CONSTRAINT \`FK_4a39e6ac0cecdf18307a365cf3c\` FOREIGN KEY (\`userId\`) REFERENCES \`hell_ta_bus\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`feedback\` ADD CONSTRAINT \`FK_e675d6edeb1d4c6012f5210cb4b\` FOREIGN KEY (\`exerciseHistoryId\`) REFERENCES \`hell_ta_bus\`.\`exercise-history\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`set\` ADD CONSTRAINT \`FK_a6b0bea800657ebfb5ed1e784cf\` FOREIGN KEY (\`exerciseHistoryId\`) REFERENCES \`hell_ta_bus\`.\`exercise-history\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`exercise-history\` ADD CONSTRAINT \`FK_1cdf1e212555b1d4abf7b463d18\` FOREIGN KEY (\`userId\`) REFERENCES \`hell_ta_bus\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`exercise-history\` ADD CONSTRAINT \`FK_d823182de5cc105f7ec3860d45c\` FOREIGN KEY (\`exerciseId\`) REFERENCES \`hell_ta_bus\`.\`exercise\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await getRepository('exercise').save(ExerciseSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`exercise-history\` DROP FOREIGN KEY \`FK_d823182de5cc105f7ec3860d45c\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`exercise-history\` DROP FOREIGN KEY \`FK_1cdf1e212555b1d4abf7b463d18\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`set\` DROP FOREIGN KEY \`FK_a6b0bea800657ebfb5ed1e784cf\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`feedback\` DROP FOREIGN KEY \`FK_e675d6edeb1d4c6012f5210cb4b\``);
        await queryRunner.query(`ALTER TABLE \`hell_ta_bus\`.\`feedback\` DROP FOREIGN KEY \`FK_4a39e6ac0cecdf18307a365cf3c\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`exercise-history\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`set\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`exercise\``);
        await queryRunner.query(`DROP INDEX \`IDX_ec0b5b4045a9b6f42ccb2f6acc\` ON \`hell_ta_bus\`.\`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`hell_ta_bus\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`user\``);
        await queryRunner.query(`DROP TABLE \`hell_ta_bus\`.\`feedback\``);
    }

}
