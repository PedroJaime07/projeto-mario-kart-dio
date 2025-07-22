const player1 = {
  nome: "Mario",
  velocidade: 4,
  manobrabilidade: 3,
  poder: 3,
  ponto: 0,
};

const player2 = {
  nome: "Luigi",
  velocidade: 3,
  manobrabilidade: 4,
  poder: 4,
  ponto: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;
  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }
  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function randomPower() {
  let random = Math.random();
  let result
  random < 0.70 ? result = "CASCO" : result = "BOMBA";
  return result;
}

async function extraPoint(player1, player2) {
    let randomProbability = Math.random()
    let randomPlayerChance = Math.random()
    if(randomProbability > 0.75) {
        if(randomPlayerChance < 0.5) {
            console.log(`🍄 ${player1.nome} pegou um cogumelo! Ganhou 1 ponto`)
            player1.ponto++
        } else {
            console.log(`🍄 ${player2.nome} pegou um cogumelo! Ganhou 1 ponto`)
            player2.ponto++
        }
    } 
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 10; round++) {
    console.log(`🏁 Rodada ${round}`);

    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // roll dice
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // hability test
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;


    // extra point
    await extraPoint(character1, character2)

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.velocidade;
      totalTestSkill2 = diceResult2 + character2.velocidade;

      await logRollResult(
        character1.nome,
        "velocidade",
        diceResult1,
        character1.velocidade
      );
      await logRollResult(
        character2.nome,
        "velocidade",
        diceResult2,
        character2.velocidade
      );
      totalTestSkill1 === totalTestSkill2 ? console.log("Empate! Ninguém marcou ponto!") : null;
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.manobrabilidade;

      await logRollResult(
        character1.nome,
        "manobrabilidade",
        diceResult1,
        character1.manobrabilidade
      );
      await logRollResult(
        character2.nome,
        "manobrabilidade",
        diceResult2,
        character2.manobrabilidade
      );

      totalTestSkill1 === totalTestSkill2 ? console.log("Ninguém marcou ponto") : null;
    }

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.poder;
      let powerResult2 = diceResult2 + character2.poder;

      await logRollResult(
        character1.nome,
        "poder",
        diceResult1,
        character1.poder
      );
      await logRollResult(
        character2.nome,
        "poder",
        diceResult2,
        character2.poder
      );
      let confrotation = await randomPower();

      console.log(`${character1.nome} confrontou ${character2.nome}! 🥊`);

      if (confrotation === "CASCO") {
        if (powerResult1 > powerResult2 && character2.ponto > 0) {
          console.log(
            `${character1.nome} venceu o confronto! ${character2.nome} pedeu 1 ponto 🐢`
          );
          character2.ponto--;
        }

        if (powerResult2 > powerResult1 && character1.ponto > 0) {
          console.log(
            `${character2.nome} venceu o confronto! ${character1.nome} pedeu 1 ponto 🐢`
          );
          character1.ponto--;
        }

        if (powerResult1 === powerResult2) {
          console.log("Confronto empatado! Nenhum ponto foi perdido");
        }
      } else {
        if(powerResult1 > powerResult2 && character2.ponto > 1) {
            console.log(`${character1.nome} venceu o confronto! ${character2.nome} pedeu 2 ponto 💣`)
            character2.ponto = character2.ponto - 2
        } else if (powerResult1 > powerResult2 && character2.ponto === 1) {
            console.log(`${character1.nome} venceu o confronto! ${character2.nome} pedeu 1 ponto 💣`)
            character2.ponto--
        }

        if(powerResult2 > powerResult1 && character1.ponto > 1) {
            console.log(`${character2.nome} venceu o confronto! ${character1.nome} pedeu 2 ponto 💣`)
            character1.ponto = character1.ponto - 2
        } else if(powerResult2 > powerResult1 && character1.ponto === 1) {
            console.log(`${character2.nome} venceu o confronto! ${character1.nome} pedeu 1 ponto 💣`)
            character1.ponto--
        }

        if(powerResult1 === powerResult2) {
            console.log('Confronto empatado! Nenhum ponto foi perdido')
        }
      }
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.nome} marcou um ponto !`);
      character1.ponto++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.nome} marcou um ponto !`);
      character2.ponto++;
    }

    console.log("----------------------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.nome}: ${character1.ponto} ponto(s)`);
  console.log(`${character2.nome}: ${character2.ponto} ponto(s)`);

  if (character1.ponto > character2.ponto) {
    console.log(`\n${character1.nome} venceu a corrida! Parabéns! 🏆`);
  } else if (character2.ponto > character1.ponto) {
    console.log(`\n${character2.nome} venceu a corrida! Parabéns! 🏆`);
  } else {
    console.log("A corrida terminou em empate");
  }
}

(async function main() {
  console.log(
    `\n🏁 🚨 Corrida entre ${player1.nome} e ${player2.nome} começando...\n`
  );

  await playRaceEngine(player1, player2);

  await declareWinner(player1, player2);
})();
