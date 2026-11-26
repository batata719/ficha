tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            void: 'var(--bg-void)',
            surface: 'var(--bg-surface)',
            elevated: 'var(--bg-elevated)',
            borderSubtle: 'var(--border-subtle)',
            white: 'var(--text-primary)',
            zinc: {
              200: 'var(--text-secondary)',
              300: 'var(--text-secondary)',
              400: 'var(--text-muted)',
              500: 'var(--text-faint)',
              700: 'var(--border-strong)',
              800: 'var(--bg-hover)',
            }
          }
        }
      }
    }


const NEX_STEPS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 99];

    const ATTRIBUTE_INFO = [
      { key: 'AGI', name: 'Agilidade' },
      { key: 'FOR', name: 'Força' },
      { key: 'INT', name: 'Intelecto' },
      { key: 'PRE', name: 'Presença' },
      { key: 'VIG', name: 'Vigor' }
    ];

    const OFFICIAL_SKILLS = [
      { name: 'Acrobacia', attr: 'AGI', trainedOnly: false, armorPenalty: true },
      { name: 'Adestramento', attr: 'PRE', trainedOnly: true, armorPenalty: false },
      { name: 'Artes', attr: 'PRE', trainedOnly: true, armorPenalty: false },
      { name: 'Atletismo', attr: 'FOR', trainedOnly: false, armorPenalty: false },
      { name: 'Atualidades', attr: 'INT', trainedOnly: false, armorPenalty: false },
      { name: 'Ciências', attr: 'INT', trainedOnly: true, armorPenalty: false },
      { name: 'Crime', attr: 'AGI', trainedOnly: true, armorPenalty: true },
      { name: 'Diplomacia', attr: 'PRE', trainedOnly: false, armorPenalty: false },
      { name: 'Enganação', attr: 'PRE', trainedOnly: false, armorPenalty: false },
      { name: 'Fortitude', attr: 'VIG', trainedOnly: false, armorPenalty: false },
      { name: 'Furtividade', attr: 'AGI', trainedOnly: false, armorPenalty: true },
      { name: 'Iniciativa', attr: 'AGI', trainedOnly: false, armorPenalty: false },
      { name: 'Intimidação', attr: 'PRE', trainedOnly: false, armorPenalty: false },
      { name: 'Intuição', attr: 'PRE', trainedOnly: false, armorPenalty: false },
      { name: 'Investigação', attr: 'INT', trainedOnly: false, armorPenalty: false },
      { name: 'Luta', attr: 'FOR', trainedOnly: false, armorPenalty: false },
      { name: 'Medicina', attr: 'INT', trainedOnly: false, armorPenalty: false },
      { name: 'Ocultismo', attr: 'INT', trainedOnly: true, armorPenalty: false },
      { name: 'Percepção', attr: 'PRE', trainedOnly: false, armorPenalty: false },
      { name: 'Pilotagem', attr: 'AGI', trainedOnly: true, armorPenalty: false },
      { name: 'Pontaria', attr: 'AGI', trainedOnly: false, armorPenalty: false },
      { name: 'Profissão', attr: 'INT', trainedOnly: true, armorPenalty: false },
      { name: 'Reflexos', attr: 'AGI', trainedOnly: false, armorPenalty: false },
      { name: 'Religião', attr: 'PRE', trainedOnly: true, armorPenalty: false },
      { name: 'Sobrevivência', attr: 'INT', trainedOnly: false, armorPenalty: false },
      { name: 'Tática', attr: 'INT', trainedOnly: true, armorPenalty: false },
      { name: 'Tecnologia', attr: 'INT', trainedOnly: true, armorPenalty: false },
      { name: 'Vontade', attr: 'PRE', trainedOnly: false, armorPenalty: false }
    ];

    const PATENT_LIMITS = {
      'Recruta': { I: 2, II: 0, III: 0, IV: 0 },
      'Operador': { I: 3, II: 1, III: 0, IV: 0 },
      'Agente Especial': { I: 3, II: 2, III: 1, IV: 0 },
      'Oficial de Operações': { I: 3, II: 3, III: 2, IV: 1 },
      'Agente de Elite': { I: 3, II: 3, III: 3, IV: 2 }
    };

    const ELEMENT_THEMES = {
      'Nenhuma': { accent: '#a855f7', soft: 'rgba(168, 85, 247, 0.14)', border: 'rgba(168, 85, 247, 0.42)' },
      'Sangue': { accent: '#ef4444', soft: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.45)' },
      'Morte': { accent: '#a1a1aa', soft: 'rgba(161, 161, 170, 0.15)', border: 'rgba(161, 161, 170, 0.45)' },
      'Conhecimento': { accent: '#f59e0b', soft: 'rgba(245, 158, 11, 0.15)', border: 'rgba(245, 158, 11, 0.45)' },
      'Energia': { accent: '#a855f7', soft: 'rgba(168, 85, 247, 0.16)', border: 'rgba(168, 85, 247, 0.48)' },
      'Medo': { accent: '#38bdf8', soft: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.45)' }
    };

    const NEX_MILESTONES = {
      5: 'Criação de Agente',
      10: 'Habilidade de Trilha',
      15: 'Poder de Classe',
      20: 'Aumento de Atributo (+1)',
      25: 'Poder de Classe / 2º Círculo (Ocultista)',
      30: 'Poder de Classe',
      35: 'Grau de Treinamento (Veterano)',
      40: 'Habilidade de Trilha',
      45: 'Poder de Classe',
      50: 'Aumento de Atributo (+1) & Versatilidade',
      55: 'Poder de Classe / 3º Círculo (Ocultista)',
      60: 'Poder de Classe',
      65: 'Habilidade de Trilha',
      70: 'Grau de Treinamento (Expert)',
      75: 'Poder de Classe',
      80: 'Aumento de Atributo (+1)',
      85: 'Poder de Classe / 4º Círculo (Ocultista)',
      90: 'Poder de Classe',
      95: 'Aumento de Atributo (+1)',
      99: 'Habilidade de Trilha Final'
    };

    const ORIGINS_DB = [
      {
        name: 'Acadêmico',
        lore: 'Você era um pesquisador ou professor universitário. De forma proposital ou não, seus estudos tocaram em assuntos misteriosos e chamaram a atenção da Ordo Realitas.',
        skills: ['Ciências', 'Investigação'],
        power: 'Saber é Poder',
        desc: 'Quando faz um teste usando Intelecto, você pode gastar 2 PE para receber +5 nesse teste.'
      },
      {
        name: 'Agente de Saúde',
        lore: 'Você era um profissional da saúde como um enfermeiro, farmacêutico, médico, psicólogo ou socorrista, treinado no atendimento e cuidado de pessoas. Você pode ter sido recrutado pela Ordem por conta de seus conhecimentos ou por ter se deparado com algo paranormal durante seu trabalho.',
        skills: ['Intuição', 'Medicina'],
        power: 'Técnica Medicinal',
        desc: 'Sempre que cura um personagem, você adiciona seu Intelecto no total de PV curados.'
      },
      {
        name: 'Amnésico',
        lore: 'Você perdeu a maior parte da sua memória. Sabe apenas o próprio nome, ou nem isso. Sua amnésia pode ser resultado de um trauma paranormal ou mesmo de um ritual. Talvez você tenha sido vítima de cultistas? Talvez você tenha sido um cultista? Seja como for, hoje a Ordem é a única família que conhece. Quem sabe, cumprindo missões, você descubra algo sobre seu passado.',
        skills: [],
        power: 'Vislumbres do Passado',
        desc: 'Você recebe duas perícias a escolha do mestre. Uma vez por sessão, pode fazer um teste de Intelecto (DT 10) para reconhecer pessoas ou lugares familiares.'
      },
      {
        name: 'Artista',
        lore: 'Você era um ator, músico, escritor, dançarino, influenciador... Seu trabalho pode ter sido inspirado por uma experiência paranormal do passado e o que o público acha que é pura criatividade, a Ordem sabe que tem um fundo de verdade.',
        skills: ['Artes', 'Enganação'],
        power: 'Magnum Opus',
        desc: 'Você é famoso por uma de suas obras. Uma vez por missão, pode determinar que um personagem envolto em uma cena de interação o reconheça. Você recebe +5 em testes de Presença e perícias baseadas em Presença contra aquele personagem.'
      },
      {
        name: 'Atleta',
        lore: 'Você competia em um esporte individual ou por equipe, como natação ou futebol. Sua alta performance pode ser fruto de alguma influência paranormal que nem mesmo você conhecia ou você pode ter se envolvido em algum evento paranormal em uma de suas competições.',
        skills: ['Acrobacia', 'Atletismo'],
        power: '110%',
        desc: 'Quando faz um teste de perícia usando Força ou Agilidade (exceto luta e pontaria) você pode gastar 2 PE para receber +5 nesse teste.'
      },
      {
        name: 'Chef',
        lore: 'Você é um cozinheiro amador ou profissional. Talvez trabalhasse em um restaurante, talvez simplesmente gostasse de cozinhar para a família e amigos. Como muitos chefs, você já explorou ingredientes bastante exóticos para criar pratos únicos — e algum deles pode ter sido paranormal.',
        skills: ['Fortitude', 'Profissão'],
        power: 'Ingrediente Secreto',
        desc: 'Em cenas de interlúdio, você pode fazer a ação alimentar-se para cozinhar um prato especial. Você, e todos os membros do grupo que se alimentarem, recebem o benefício de dois pratos.'
      },
      {
        name: 'Criminoso',
        lore: 'Você vivia uma vida fora da lei, seja como mero batedor de carteiras, seja como membro de uma facção criminosa. Em algum momento, você se envolveu em um assunto da Ordem, talvez tenha roubado um item amaldiçoado. A organização, então, lhe deu uma escolha: ser preso ou trabalhar para ela.',
        skills: ['Crime', 'Furtividade'],
        power: 'O Crime Compensa',
        desc: 'No final de uma missão, escolha um item encontrado na missão. Em sua próxima missão, você pode incluir esse item em seu inventário sem que ele conte em seu limite de itens por patente.'
      },
      {
        name: 'Cultista Arrependido',
        lore: 'Você fez parte de um culto paranormal. Talvez fossem apenas ignorantes iludidos, que acreditavam estar contatando entidades benevolentes. Talvez soubessem exatamente o que estavam fazendo. Seja como for, algo abriu seus olhos e agora você luta pelo lado certo — embora carregue para sempre traços de sua vida pregressa.',
        skills: ['Ocultismo', 'Religião'],
        power: 'Traços do Outro Lado',
        desc: 'Você possui um poder paranormal à sua escolha. Porém, começa o jogo com metade da Sanidade normal para sua classe.'
      },
      {
        name: 'Desgarrado',
        lore: 'Você não vivia de acordo com as normas da sociedade. Era um eremita, uma pessoa em situação de rua ou simplesmente alguém que descobriu o paranormal e abandonou sua rotina — sabendo o quão frágil era a fachada da normalidade. De um jeito ou de outro, todas essas vidas marginalizadas o ensinaram a se virar sem muito conforto.',
        skills: ['Fortitude', 'Sobrevivência'],
        power: 'Calejado',
        desc: 'Você recebe +1 PV para cada 5% de NEX.'
      },
      {
        name: 'Engenheiro',
        lore: 'Enquanto os acadêmicos estão preocupados com teorias, você colocar a mão na massa, seja como engenheiro profissional, seja como inventor de garagem. Provavelmente você criou algum dispositivo paranormal que chamou a atenção da Ordem.',
        skills: ['Profissão', 'Tecnologia'],
        power: 'Ferramentas Favoritas',
        desc: 'Um item a sua escolha (exceto armas) conta como uma categoria abaixo.'
      },
      {
        name: 'Executivo',
        lore: 'Você possuía um trabalho de escritório em uma grande empresa, banco ou corporação. Era um administrador, advogado, contador ou de qualquer outra profissão que lida com papelada e burocracia. Sua vida era bastante comum, até que você descobriu algo que não devia.',
        skills: ['Diplomacia', 'Profissão'],
        power: 'Processo Otimizado',
        desc: 'Sempre que faz um teste de perícia durante um teste estendido, ou uma ação para revisar documentos (físicos ou digitais), pode pagar 2 PE para receber +5 nesse teste.'
      },
      {
        name: 'Investigador',
        lore: 'Você era um investigador do governo, como um perito forense ou policial federal, ou um detetive particular. Pode ter tido contato com o paranormal em algum caso ou ter sido recrutado pela Ordem por suas habilidades de resolução de mistérios.',
        skills: ['Investigação', 'Percepção'],
        power: 'Faro para Pistas',
        desc: 'Uma vez por cena, quando fizer um teste para procurar pistas, você pode gastar 1 PE para receber +5 nesse teste.'
      },
      {
        name: 'Lutador',
        lore: 'Você pratica uma arte marcial ou esporte de luta, ou cresceu em um bairro perigoso onde aprendeu briga de rua. Já quebrou muitos ossos, tanto seus quanto dos outros. Pode ter conhecido a Ordem após um torneio secreto envolvendo o paranormal ou ter sido recrutado pela sua capacidade de luta.',
        skills: ['Luta', 'Reflexos'],
        power: 'Mão Pesada',
        desc: 'Você recebe +2 em rolagens de dano com ataques corpo a corpo.'
      },
      {
        name: 'Magnata',
        lore: 'Você possui muito dinheiro ou patrimônio. Pode ser o herdeiro de uma família antiga ligada ao oculto, ter criado e vendido uma empresa e agora usa sua fortuna para financiar a Ordem, ou ter ganho dinheiro de alguma forma obscura e visto sua vida confortável ruir quando descobriu a verdade sobre o paranormal.',
        skills: ['Diplomacia', 'Pilotagem'],
        power: 'Patrocinador da Ordem',
        desc: 'Seu limite de crédito é sempre considerado um acima do atual.'
      },
      {
        name: 'Mercenário',
        lore: 'Você é um soldado de aluguel, que trabalha sozinho ou como parte de alguma organização que vende serviços militares. Já participou de missões de resgate e segurança privada, mas nunca enfrentou algo como o paranormal — até o dia em que seu contratante era a Ordo Realitas.',
        skills: ['Iniciativa', 'Intimidação'],
        power: 'Posição de Combate',
        desc: 'No primeiro turno de cada cena de ação, você pode gastar 2 PE para receber uma ação de movimento adicional.'
      },
      {
        name: 'Militar',
        lore: 'Você serviu em uma força militar, como o exército ou a marinha. Passou muito tempo treinando com armas de fogo, até se tornar um perito no uso delas. Acostumado a obedecer ordens e manter a calma em situações extremas, você se encaixa perfeitamente nos quadros da Ordem.',
        skills: ['Pontaria', 'Tática'],
        power: 'Para Bellum',
        desc: 'Você recebe +2 em rolagens de dano com armas de fogo.'
      },
      {
        name: 'Operário',
        lore: 'Pedreiro, maquinista, operador de guindaste, motorista... Você passava seus dias em um trabalho pesado, até o dia em que algo aconteceu. Talvez um acidente na obra tenha revelado um artefato paranormal, ou você tenha sido chamado para demolir um prédio assombrado.',
        skills: ['Fortitude', 'Profissão'],
        power: 'Ferramenta de Trabalho',
        desc: 'Escolha uma arma simples ou tática que, a critério do mestre, poderia ser usada como ferramenta em sua profissão. Você sabe usar a arma escolhida e recebe +1 em testes de ataque, rolagens de dano e margem de ameaça com ela.'
      },
      {
        name: 'Policial',
        lore: 'Você serviu em uma força de segurança (polícia militar, civil, guarda municipal). Em alguma patrulha ou ocorrência, você se deparou com um caso que não podia ser explicado pela lei ou pela lógica comum — e que mudou sua vida para sempre.',
        skills: ['Percepção', 'Pontaria'],
        power: 'Patrulha',
        desc: 'Você recebe +2 em Defesa.'
      },
      {
        name: 'Religioso',
        lore: 'Você é devoto ou sacerdote de uma fé. Independentemente da religião que pratica, se dedica a auxiliar as pessoas com problemas espirituais. A partir do momento em que teve contato com o paranormal, descobriu que o Outro Lado é muito mais real e perigoso do que imaginava.',
        skills: ['Religião', 'Vontade'],
        power: 'Acalentar',
        desc: 'Você recebe +5 em testes de Religião para acalmar. Além disso, quando acalma uma pessoa, ela recebe um número de pontos de Sanidade igual a 1d6 + a sua Presença.'
      },
      {
        name: 'Servidor Público',
        lore: 'Você possuía um cargo em algum órgão do governo, passando seus dias lidando com pessoas e burocracia. Em algum momento, um documento confidencial ou um arquivo perdido acabou passando pelas suas mãos, revelando a existência do paranormal.',
        skills: ['Intuição', 'Vontade'],
        power: 'Espírito Cívico',
        desc: 'Sempre que faz um teste para ajudar, você pode gastar 1 PE para aumentar o bônus concedido em +2.'
      },
      {
        name: 'Teórico da Conspiração',
        lore: 'A humanidade nunca pisou na lua. Reptilianos ocupam importantes cargos públicos. A Terra é plana... Você sempre achou que o governo e a mídia escondiam a verdade da população. Quando descobriu o paranormal, percebeu que estava certo — embora a realidade fosse ainda mais bizarra.',
        skills: ['Investigação', 'Ocultismo'],
        power: 'Eu Já Sabia',
        desc: 'Você não se abala com entidades ou anomalias. Afinal, sempre soube que isso tudo existia. Você recebe resistência a dano mental igual ao seu Intelecto.'
      },
      {
        name: 'T.I.',
        lore: 'Programador, engenheiro de software ou simplesmente "o cara da informática", você tem treinamento e experiência para lidar com sistemas computadorizados. Seu talento (ou curiosidade) acabou levando você a invadir um servidor protegido da Ordem ou de algum culto.',
        skills: ['Investigação', 'Tecnologia'],
        power: 'Motor de Busca',
        desc: 'A critério do Mestre, sempre que tiver acesso a internet, você pode gastar 2 PE para substituir um teste de perícia qualquer por um teste de Tecnologia.'
      },
      {
        name: 'Trabalhador Rural',
        lore: 'Você trabalhava no campo ou em áreas isoladas, como fazendeiro, pescador, lenhador ou biólogo de campo. Você conhece a natureza e os perigos do isolamento — e descobriu que, longe das luzes da cidade, o Outro Lado costuma se manifestar com muito mais liberdade.',
        skills: ['Adestramento', 'Sobrevivência'],
        power: 'Desbravador',
        desc: 'Quando faz um teste de Adestramento ou Sobrevivência, você pode gastar 2 PE para receber +5 nesse teste. Além disso, você não sofre penalidade em deslocamento por terreno difícil.'
      },
      {
        name: 'Trambiqueiro',
        lore: 'Uma vida digna dá muito trabalho. Você sempre preferiu ganhar a vida na base da conversa, aplicando pequenos golpes, falsificando documentos ou jogando cartas marcadas — até o dia em que tentou enganar a pessoa errada e acabou no meio de um ritual.',
        skills: ['Crime', 'Enganação'],
        power: 'Impostor',
        desc: 'Uma vez por cena, você pode gastar 2 PE para substituir um teste de perícia qualquer por um teste de Enganação.'
      },
      {
        name: 'Universitário',
        lore: 'Você era aluno de uma faculdade. Em sua rotina de estudos, festas e trabalhos acadêmicos, você acabou esbarrando em um livro proibido na biblioteca, um professor misterioso ou um evento inexplicável no campus.',
        skills: ['Atualidades', 'Investigação'],
        power: 'Dedicação',
        desc: 'Você recebe +1 PE, e mais 1 PE adicional a cada NEX ímpar (15%, 25%...). Além disso, seu limite de PE por turno aumenta em 1.'
      },
      {
        name: 'Vítima',
        lore: 'Em algum momento da sua vida — talvez na infância, talvez recentemente — você foi alvo de um evento paranormal traumático. Você sobreviveu, mas as cicatrizes mentais nunca sumiram. Agora, você trabalha com a Ordem para garantir que ninguém mais passe pelo que você passou.',
        skills: ['Reflexos', 'Vontade'],
        power: 'Cicatrizes Psicológicas',
        desc: 'Você recebe +1 de Sanidade para cada 5% de NEX.'
      }
    ];

    const CLASSES_DB = {
      'Combatente': {
        desc: 'Treinado para lutar com todo tipo de armas, e com a força e a coragem para encarar os perigos de frente. É o tipo de agente que prefere abordagens mais diretas e costuma atirar primeiro e perguntar depois. Do mercenário especialista em armas de fogo até o perito em espadas, combatentes apresentam uma gama enorme de habilidades e técnicas especiais que aprimoram sua eficiência no campo de batalha, tornando-os membros essenciais em qualquer missão de extermínio.',
        baseAbility: { name: 'Ataque Especial (2 PE)', desc: 'Quando faz um ataque, você pode gastar 2 PE para receber +5 no teste de ataque ou na rolagem de dano (aumenta em +5 para cada +1 PE em NEX 25%, 55% e 85%).' },
        paths: {
          'Aniquilador': [
            { nex: 10, name: 'A Favorita', desc: 'Escolha uma arma para ser sua favorita. A categoria dela reduz em I (aumenta para II em 40% e III em 65%).' },
            { nex: 40, name: 'Técnica Secreta', desc: 'A categoria da favorita reduz em II. Ao atacar com ela, pode gastar 2 PE para aplicar efeitos como Ampla ou Destruidora.' },
            { nex: 65, name: 'Técnica Sublime', desc: 'Você adiciona seu Intelecto ou Agilidade ao dano da arma favorita e ignora 10 de RD.' },
            { nex: 99, name: 'Máquina de Matar', desc: 'O multiplicador de crítico da arma favorita aumenta em +1 e o dano base aumenta em dois passos.' }
          ],
          'Comandante de Campo': [
            { nex: 10, name: 'Inspirar Confiança', desc: 'Reação (2 PE): Faz um aliado em alcance curto rolar novamente um teste recém realizado.' },
            { nex: 40, name: 'Estrategista', desc: 'Padrão (1 PE por aliado): Concede uma ação de movimento extra no próximo turno aos aliados escolhidos.' },
            { nex: 65, name: 'Brecha na Guarda', desc: 'Reação (2 PE): Quando um aliado acerta um ataque, outro aliado pode fazer um ataque imediato contra o mesmo alvo.' },
            { nex: 99, name: 'Oficial Comandante', desc: 'Padrão (5 PE): Todos os aliados em alcance médio recebem uma ação padrão adicional.' }
          ],
          'Guerreiro': [
            { nex: 10, name: 'Técnica Letal', desc: 'Você recebe +2 na margem de ameaça com todas as suas armas corpo a corpo.' },
            { nex: 40, name: 'Revidar', desc: 'Reação (2 PE): Sempre que bloquear um ataque corpo a corpo, pode fazer um ataque corpo a corpo imediato contra o agressor.' },
            { nex: 65, name: 'Força Opressora', desc: 'Quando acerta um ataque corpo a corpo, pode gastar 1 PE para derrubar ou empurrar o alvo gratuitamente.' },
            { nex: 99, name: 'Potência Máxima', desc: 'Quando usa seu Ataque Especial com armas corpo a corpo, todos os bônus numéricos são dobrados.' }
          ],
          'Operações Especiais': [
            { nex: 10, name: 'Iniciativa Aprimorada', desc: 'Você recebe +5 em Iniciativa e uma ação de movimento extra na primeira rodada.' },
            { nex: 40, name: 'Ataque Extra', desc: 'Uma vez por rodada, quando faz um ataque, pode gastar 2 PE para fazer um ataque adicional.' },
            { nex: 65, name: 'Surto de Adrenalina', desc: 'Uma vez por rodada, você pode gastar 5 PE para receber uma ação padrão ou de movimento adicional.' },
            { nex: 99, name: 'Sempre Alerta', desc: 'Você recebe uma ação padrão adicional no início de cada cena de combate.' }
          ],
          'Tropa de Choque': [
            { nex: 10, name: 'Casca Grossa', desc: 'Você recebe +1 PV para cada 5% de NEX e soma seu Vigor na RD quando bloqueia (já aplicado no Bloqueio).' },
            { nex: 40, name: 'Cai Dentro', desc: 'Movimento (1 PE): Força oponentes em alcance curto a passarem em Vontade ou atacarem você.' },
            { nex: 65, name: 'Duro de Matar', desc: 'Reação (2 PE): Reduz pela metade qualquer dano sofrido.' },
            { nex: 99, name: 'Inquebrável', desc: 'Enquanto estiver machucado, você recebe +5 na Defesa e RD 5 contra todos os tipos de dano.' }
          ]
        }
      },
      'Especialista': {
        desc: 'Um agente que confia mais em esperteza do que em força bruta. Especialistas se valem de conhecimento técnico, raciocínio rápido ou mesmo lábia para resolver mistérios e enfrentar o paranormal. Cientistas, inventores, pesquisadores e técnicos de vários tipos são exemplos de especialistas, que são tão variados quanto as áreas do conhecimento e da tecnologia.',
        baseAbility: { name: 'Perito (2 PE) & Eclético (2 PE)', desc: 'Perito: Escolha 2 perícias treinadas; gaste 2 PE para somar +1d6 (sobe até +1d12). Eclético: Gaste 2 PE para ser considerado treinado em qualquer perícia por um teste.' },
        paths: {
          'Atirador de Elite': [
            { nex: 10, name: 'Mira de Elite', desc: 'Você recebe proficiência com armas de fogo que usam balas longas e soma seu Intelecto nas rolagens de dano com elas.' },
            { nex: 40, name: 'Disparo Letal', desc: 'Mirando (1 PE): Aumenta a margem de ameaça em +2 no próximo disparo.' },
            { nex: 65, name: 'Disparo Impactante', desc: 'Ao acertar um tiro, pode gastar 2 PE para derrubar, desarmar ou empurrar o alvo.' },
            { nex: 99, name: 'Atirar para Matar', desc: 'Quando acerta um crítico com arma de fogo, causa dano máximo sem precisar rolar os dados.' }
          ],
          'Infiltrador': [
            { nex: 10, name: 'Ataque Furtivo', desc: 'Uma vez por rodada, ao atingir um alvo desprevenido ou flanqueado, causa +1d6 de dano (aumenta para +2d6 em 40%, +3d6 em 65%, +4d6 em 99%).' },
            { nex: 40, name: 'Gatuno', desc: 'Você recebe +5 em Atletismo e Crime e pode se mover com deslocamento normal enquanto furtivo.' },
            { nex: 65, name: 'Assassinar', desc: 'Movimento (3 PE): Estuda um alvo; se acertar um ataque furtivo nele, o dano furtivo é dobrado.' },
            { nex: 99, name: 'Sombra Fugaz', desc: 'Quando faz um teste de Furtividade após atacar ou fazer outra ação chamativa, pode gastar 3 PE para não sofrer penalidades.' }
          ],
          'Médico de Campo': [
            { nex: 10, name: 'Paramédico', desc: 'Padrão (2 PE): Usa Medicina para curar 2d10 PV em um aliado adjacente (aumenta em 40%, 65% e 99%).' },
            { nex: 40, name: 'Equipe de Trauma', desc: 'Padrão (2 PE): Remove uma condição negativa (como sangrando, envenenado ou paralisado) de um aliado.' },
            { nex: 65, name: 'Resgate', desc: 'Uma vez por rodada, se estiver adjacente a um aliado machucado ou morrendo, pode movê-lo como ação livre.' },
            { nex: 99, name: 'Reanimação', desc: 'Completa (10 PE): Traz de volta à vida um personagem que morreu na mesma cena.' }
          ],
          'Negociador': [
            { nex: 10, name: 'Eloquência', desc: 'Completa (1 PE por alvo): Usa Diplomacia, Enganação ou Intimidação para fascinar ou distrair alvos em alcance curto.' },
            { nex: 40, name: 'Discurso Motivador', desc: 'Padrão (4 PE): Concede +1d6 em testes de perícia para todos os aliados em alcance curto até o fim da cena.' },
            { nex: 65, name: 'Eu Conheço um Cara', desc: 'Uma vez por missão, você pode ativar um contato para conseguir um favor, equipamento ou transporte.' },
            { nex: 99, name: 'Truque de Mestre', desc: 'Reação (5 PE): Simula qualquer habilidade de classe de outro aliado que você tenha visto usar na cena.' }
          ],
          'Técnico': [
            { nex: 10, name: 'Inventário Otimizado', desc: 'Você soma seu Intelecto à sua Força para calcular sua capacidade de carga (já aplicado automaticamente!).' },
            { nex: 40, name: 'Remendão', desc: 'Movimento (1 PE): Conserta um item quebrado ou remove a condição enguiçado.' },
            { nex: 65, name: 'Improvisar', desc: 'Padrão (2 PE + 2 PE por categoria): Cria qualquer equipamento geral ou munição a partir de sucata.' },
            { nex: 99, name: 'Preparado para Tudo', desc: 'Você sempre tem o item exato: pode gastar 3 PE para sacar qualquer item de até Categoria III da mochila.' }
          ]
        }
      },
      'Ocultista': {
        desc: 'O Outro Lado é misterioso, perigoso e, de certa forma, cativante. Muitos estudiosos das entidades se perdem em seus reinos obscuros em busca de poder, mas existem aqueles que visam compreender e dominar os mistérios paranormais para usá-los para combater o próprio Outro Lado. Esse tipo de agente não apenas é um conhecedor do oculto, como também possui talento para se conectar com elementos paranormais.',
        baseAbility: { name: 'Escolhido pelo Outro Lado', desc: 'Você pode lançar rituais de 1º círculo (2º em NEX 25%, 3º em NEX 55%, 4º em NEX 85%). Começa com 3 rituais de 1º círculo e aprende +1 a cada novo NEX.' },
        paths: {
          'Conduíte': [
            { nex: 10, name: 'Ampliar Ritual', desc: 'Quando lança um ritual, pode gastar +2 PE para aumentar seu alcance em um passo ou dobrar sua área.' },
            { nex: 40, name: 'Acelerar Ritual', desc: 'Uma vez por rodada, pode gastar +4 PE para conjurar um ritual como ação livre.' },
            { nex: 65, name: 'Anular Ritual', desc: 'Reação (custo do ritual): Faz um teste oposto de Ocultismo para dissipar um ritual conjurado por outro ser.' },
            { nex: 99, name: 'Canalizar o Medo', desc: 'Você aprende o ritual Canalizar o Medo.' }
          ],
          'Flagelador': [
            { nex: 10, name: 'Poder do Flagelo', desc: 'Ao conjurar um ritual, você pode gastar seus próprios PV no lugar de PE (2 PV por 1 PE).' },
            { nex: 40, name: 'Abraçar a Dor', desc: 'Reação (2 PE): Sempre que sofrer dano não paranormal, reduz esse dano à metade.' },
            { nex: 65, name: 'Absorver Agonia', desc: 'Sempre que reduz um inimigo a 0 PV com um ritual, recebe PE temporários iguais ao círculo do ritual.' },
            { nex: 99, name: 'Medo Tangível', desc: 'Você aprende o ritual Medo Tangível.' }
          ],
          'Graduado': [
            { nex: 10, name: 'Saber Ampliado', desc: 'Você aprende um ritual adicional de 1º círculo (e mais um cada vez que ganha acesso a um novo círculo).' },
            { nex: 40, name: 'Grimório Ritualístico', desc: 'Você cria um grimório que armazena rituais extras iguais ao seu Intelecto (exige 1 ação de movimento para ler).' },
            { nex: 65, name: 'Rituais Eficientes', desc: 'A DT para resistir a todos os seus rituais aumenta em +5.' },
            { nex: 99, name: 'Conhecendo o Medo', desc: 'Você aprende o ritual Conhecendo o Medo.' }
          ],
          'Intuitivo': [
            { nex: 10, name: 'Mente Sã', desc: 'Você recebe +5 em testes de resistência contra efeitos paranormais e resistência mental 5.' },
            { nex: 40, name: 'Presença Poderosa', desc: 'Você adiciona sua Presença ao seu limite de PE por turno.' },
            { nex: 65, name: 'Inabalável', desc: 'Sua resistência mental aumenta para 10 e você ignora condições de medo.' },
            { nex: 99, name: 'Presença do Medo', desc: 'Você aprende o ritual Presença do Medo.' }
          ],
          'Lâmina Paranormal': [
            { nex: 10, name: 'Lâmina Maldita', desc: 'Você aprende Amaldiçoar Arma e pode usar Ocultismo no lugar de Luta ou Pontaria com armas amaldiçoadas.' },
            { nex: 40, name: 'Gladiador Paranormal', desc: 'Sempre que acerta um ataque corpo a corpo em um inimigo, recebe 2 PE temporários.' },
            { nex: 65, name: 'Conjuração Marcial', desc: 'Uma vez por rodada, quando lança um ritual de execução padrão, pode gastar 2 PE para fazer um ataque corpo a corpo como ação livre.' },
            { nex: 99, name: 'Lâmina do Medo', desc: 'Você aprende o ritual Lâmina do Medo.' }
          ]
        }
      }
    };

    const POWERS_COMPENDIUM = [
      // Combatente
      { name: 'Armamento Pesado', category: 'Combatente', req: 'FOR 2', cost: 'Passivo', desc: 'Você recebe proficiência com armas pesadas.' },
      { name: 'Ataque de Oportunidade', category: 'Combatente', req: 'Nenhum', cost: 'Reação (1 PE)', desc: 'Quando um ser sai voluntariamente de um espaço adjacente ao seu, você pode fazer um ataque corpo a corpo contra ele.' },
      { name: 'Combate Defensivo', category: 'Combatente', req: 'INT 2', cost: 'Passivo', desc: 'Quando usa a ação agredir, você pode sofrer -2 nos testes de ataque para receber +5 na Defesa até seu próximo turno.' },
      { name: 'Golpe Demolidor', category: 'Combatente', req: 'FOR 2', cost: '1 PE', desc: 'Quando usa manobra quebrar ou ataca um objeto, ignora RD e causa +1 dado de dano.' },
      { name: 'Golpe Pesado', category: 'Combatente', req: 'Nenhum', cost: 'Passivo', desc: 'O dano de suas armas corpo a corpo aumenta em mais um dado do mesmo tipo.' },
      { name: 'Proteção Pesada', category: 'Combatente', req: 'NEX 30%', cost: 'Passivo', desc: 'Você recebe proficiência com proteções pesadas.' },
      { name: 'Reflexos Defensivos', category: 'Combatente', req: 'AGI 2', cost: 'Passivo', desc: 'Você recebe +2 na Defesa e em testes de resistência (já somado na Defesa).' },
      { name: 'Saque Rápido', category: 'Combatente', req: 'Treinado em Iniciativa', cost: 'Passivo', desc: 'Você pode sacar ou guardar itens como ação livre e recarregar armas de disparo com uma categoria de ação menor.' },
      { name: 'Segurar o Gatilho', category: 'Combatente', req: 'NEX 60%', cost: '2 PE', desc: 'Sempre que acerta um ataque com arma de fogo, pode fazer outro ataque contra o mesmo alvo com penalidade cumulativa de -5.' },
      { name: 'Tanque de Guerra', category: 'Combatente', req: 'Proteção Pesada', cost: 'Passivo', desc: 'Se estiver usando proteção pesada, a Defesa e a resistência a dano que ela fornece aumentam em +2.' },
      { name: 'Tiro Certeiro', category: 'Combatente', req: 'Treinado em Pontaria', cost: 'Passivo', desc: 'Se estiver usando arma de disparo, soma sua Agilidade nas rolagens de dano e ignora penalidade por atacar alvos engajados.' },

      // Especialista
      { name: 'Artista Marcial', category: 'Especialista', req: 'Nenhum', cost: 'Passivo', desc: 'Seus ataques desarmados causam 1d6 de dano, podem causar dano letal e são considerados armas ágeis.' },
      { name: 'Balística Avançada', category: 'Especialista', req: 'Nenhum', cost: 'Passivo', desc: 'Você recebe proficiência com armas táticas de fogo e +2 em rolagens de dano com armas de fogo.' },
      { name: 'Conhecimento Aplicado', category: 'Especialista', req: 'INT 2', cost: '2 PE', desc: 'Quando faz um teste de perícia (exceto Luta e Pontaria), você pode usar Intelecto como atributo-base.' },
      { name: 'Hacker', category: 'Especialista', req: 'Treinado em Tecnologia', cost: 'Passivo', desc: 'Você recebe +5 em testes de Tecnologia para invadir sistemas e reduz o tempo necessário pela metade.' },
      { name: 'Mãos Rápidas', category: 'Especialista', req: 'AGI 3, Treinado em Crime', cost: '1 PE', desc: 'Ao fazer um teste de Crime, você pode realizá-lo como ação livre.' },
      { name: 'Mochila de Utilidades', category: 'Especialista', req: 'Nenhum', cost: 'Passivo', desc: 'Um item a sua escolha (exceto armas) tem sua categoria reduzida em I e seus espaços reduzidos em 1.' },
      { name: 'Movimento Tático', category: 'Especialista', req: 'Treinado em Atletismo', cost: '1 PE', desc: 'Você ignora a penalidade de deslocamento por terreno difícil e escalar.' },
      { name: 'Na Mosca', category: 'Especialista', req: 'Treinado em Pontaria', cost: '2 PE', desc: 'Ao fazer um ataque com arma de disparo, recebe +2 na margem de ameaça.' },
      { name: 'Nerd', category: 'Especialista', req: 'Nenhum', cost: '2 PE', desc: 'Uma vez por cena, você pode fazer um teste de Atualidades (DT 20) para lembrar de uma informação útil e receber +5 em um teste.' },
      { name: 'Ninja Urbano', category: 'Especialista', req: 'Nenhum', cost: 'Passivo', desc: 'Você recebe proficiência com armas táticas de ataque corpo a corpo e de disparo (exceto de fogo) e +2 em dano com elas.' },
      { name: 'Pensamento Ágil', category: 'Especialista', req: 'Nenhum', cost: '2 PE', desc: 'Uma vez por rodada, durante uma cena de investigação, você pode fazer uma ação de procurar pistas adicional.' },
      { name: 'Perito em Explosivos', category: 'Especialista', req: 'Nenhum', cost: 'Passivo', desc: 'Você soma seu Intelecto na DT para resistir aos seus explosivos e pode excluir aliados da área da explosão.' },

      // Ocultista
      { name: 'Camuflar Ocultismo', category: 'Ocultista', req: 'Nenhum', cost: '2 PE', desc: 'Você pode lançar um ritual sem precisar gesticular ou falar palavras ritualísticas.' },
      { name: 'Criar Selo', category: 'Ocultista', req: 'Nenhum', cost: '1 PE + custo', desc: 'Você pode fabricar selos paranormais de rituais que conheça em cenas de interlúdio.' },
      { name: 'Envolto em Mistério', category: 'Ocultista', req: 'Nenhum', cost: 'Passivo', desc: 'Você recebe +5 em Enganação e Intimidação contra pessoas não treinadas em Ocultismo.' },
      { name: 'Especialista em Elemento', category: 'Ocultista', req: 'Nenhum', cost: 'Passivo', desc: 'Escolha um elemento. A DT para resistir aos seus rituais desse elemento aumenta em +2.' },
      { name: 'Ferramentas Paranormais', category: 'Ocultista', req: 'Nenhum', cost: 'Passivo', desc: 'Você reduz a categoria de um item paranormal em I e pode ativar itens paranormais usando Ocultismo.' },
      { name: 'Fluxo de Poder', category: 'Ocultista', req: 'NEX 60%', cost: 'Passivo', desc: 'Você pode manter dois efeitos sustentados de rituais ativos simultaneamente pagando apenas o custo de um.' },
      { name: 'Guiado pelo Paranormal', category: 'Ocultista', req: 'Nenhum', cost: '2 PE', desc: 'Uma vez por cena, você pode fazer uma ação de investigação adicional.' },
      { name: 'Identificação Paranormal', category: 'Ocultista', req: 'Nenhum', cost: 'Passivo', desc: 'Você recebe +10 em testes de Ocultismo para identificar criaturas, objetos e rituais.' },
      { name: 'Improvisar Componentes', category: 'Ocultista', req: 'Nenhum', cost: '1 PE', desc: 'Uma vez por cena, você pode improvisar componentes ritualísticos de qualquer elemento usando objetos ao redor.' },
      { name: 'Intuição Paranormal', category: 'Ocultista', req: 'Nenhum', cost: 'Passivo', desc: 'Sempre que usa a ação facilitar investigação, você adiciona seu Intelecto ao bônus concedido.' },
      { name: 'Mestre em Elemento', category: 'Ocultista', req: 'Especialista em Elemento, NEX 45%', cost: 'Passivo', desc: 'O custo para lançar rituais do seu elemento escolhido diminui em -1 PE.' },
      { name: 'Ritual Potente', category: 'Ocultista', req: 'INT 2', cost: 'Passivo', desc: 'Você soma seu Intelecto nas rolagens de dano ou nos efeitos de cura de seus rituais.' },
      { name: 'Ritual Predileto', category: 'Ocultista', req: 'Nenhum', cost: 'Passivo', desc: 'Escolha um ritual que você conhece. Você reduz em -1 PE o custo para lançar esse ritual.' },
      { name: 'Tatuagem Ritualística', category: 'Ocultista', req: 'Nenhum', cost: 'Passivo', desc: 'Símbolos tatuados em sua pele funcionam como componentes ritualísticos permanentes e reduzem em -1 PE rituais de alcance pessoal.' },

      // Paranormais: Sangue
      { name: 'Anatomia Insana', category: 'Sangue', element: 'Sangue', req: 'Sangue 2', cost: 'Passivo', desc: 'Você tem 50% de chance de ignorar o dano adicional de acertos críticos e ataques furtivos.', affinityDesc: 'Afinidade: Você se torna imune a acertos críticos e ataques furtivos.' },
      { name: 'Arma de Sangue', category: 'Sangue', element: 'Sangue', req: 'Nenhum', cost: '2 PE', desc: 'Movimento: Produz uma arma natural de sangue endurecido (1d6 corte, crit 19/x2). Pode atacar com ela como ação livre por 1 PE.', affinityDesc: 'Afinidade: A arma passa a causar 1d10 de dano e você não precisa pagar PE para o ataque extra.' },
      { name: 'Sangue de Ferro', category: 'Sangue', element: 'Sangue', req: 'Nenhum', cost: 'Passivo', desc: 'Você recebe +2 PV para cada 5% de NEX (aplicado automaticamente na ficha!).', affinityDesc: 'Afinidade: Você recebe +5 em Fortitude e se torna imune a venenos e doenças.' },
      { name: 'Sangue Fervente', category: 'Sangue', element: 'Sangue', req: 'Sangue 2', cost: 'Passivo', desc: 'Enquanto estiver machucado, você recebe +1 em Agilidade ou Força à sua escolha.', affinityDesc: 'Afinidade: O bônus aumenta para +2.' },
      { name: 'Sangue Vivo', category: 'Sangue', element: 'Sangue', req: 'Sangue 1', cost: 'Passivo', desc: 'Na primeira vez que ficar machucado em uma cena, você recebe cura acelerada 2 até o fim da cena ou deixar de estar machucado.', affinityDesc: 'Afinidade: Cura acelerada aumenta para 5.' },

      // Paranormais: Morte
      { name: 'Encarar a Morte', category: 'Morte', element: 'Morte', req: 'Nenhum', cost: 'Passivo', desc: 'Durante cenas de ação, seu limite de PE por turno aumenta em +1.', affinityDesc: 'Afinidade: Seu limite de PE por turno aumenta em +2.' },
      { name: 'Escapar da Morte', category: 'Morte', element: 'Morte', req: 'Morte 1', cost: 'Passivo', desc: 'Uma vez por cena, quando receberia dano que o levaria a 0 PV, você fica com 1 PV.', affinityDesc: 'Afinidade: Você também ignora efeitos de morte instantânea.' },
      { name: 'Potencial Aprimorado', category: 'Morte', element: 'Morte', req: 'Nenhum', cost: 'Passivo', desc: 'Você recebe +1 PE para cada 5% de NEX (aplicado automaticamente na ficha!).', affinityDesc: 'Afinidade: Você recebe +1 PE adicional por 5% de NEX (total +2 por nível).' },
      { name: 'Potencial Reaproveitado', category: 'Morte', element: 'Morte', req: 'Nenhum', cost: 'Reação', desc: 'Uma vez por rodada, quando passa em um teste de resistência, você ganha 2 PE temporários.', affinityDesc: 'Afinidade: Você ganha 3 PE temporários.' },
      { name: 'Surto Temporal', category: 'Morte', element: 'Morte', req: 'Morte 2', cost: '3 PE', desc: 'Uma vez por cena, durante seu turno, você pode gastar 3 PE para realizar uma ação padrão adicional.', affinityDesc: 'Afinidade: Você pode usar este poder uma vez por rodada.' },

      // Paranormais: Conhecimento
      { name: 'Expansão de Conhecimento', category: 'Conhecimento', element: 'Conhecimento', req: 'Conhecimento 1', cost: 'Passivo', desc: 'Você aprende um poder de classe que não pertence à sua classe (ainda precisa cumprir os pré-requisitos).', affinityDesc: 'Afinidade: Você pode escolher um segundo poder de outra classe.' },
      { name: 'Percepção Paranormal', category: 'Conhecimento', element: 'Conhecimento', req: 'Nenhum', cost: 'Passivo', desc: 'Em cenas de investigação, sempre que procurar pistas, você pode rolar novamente um dado com resultado menor que 10.', affinityDesc: 'Afinidade: Você pode rolar novamente até dois dados.' },
      { name: 'Precognição', category: 'Conhecimento', element: 'Conhecimento', req: 'Conhecimento 1', cost: 'Passivo', desc: 'Você recebe +2 na Defesa e em testes de resistência (já somado na Defesa).', affinityDesc: 'Afinidade: Você fica imune à condição desprevenido.' },
      { name: 'Sensitivo', category: 'Conhecimento', element: 'Conhecimento', req: 'Nenhum', cost: 'Passivo', desc: 'Você recebe +5 em Diplomacia, Intimidação e Intuição.', affinityDesc: 'Afinidade: Você percebe automaticamente mentiras e intenções hostis.' },
      { name: 'Visão do Oculto', category: 'Conhecimento', element: 'Conhecimento', req: 'Nenhum', cost: 'Passivo', desc: 'Você não sofre penalidades por escuridão e recebe +5 em Percepção.', affinityDesc: 'Afinidade: Você enxerga através de ilusões e invisibilidade.' },

      // Paranormais: Energia
      { name: 'Afortunado', category: 'Energia', element: 'Energia', req: 'Nenhum', cost: 'Passivo', desc: 'Uma vez por rolagem, você pode rolar novamente um resultado 1 em qualquer dado que não seja d20.', affinityDesc: 'Afinidade: Uma vez por teste, você pode rolar novamente um resultado 1 em um d20.' },
      { name: 'Campo Protetor', category: 'Energia', element: 'Energia', req: 'Energia 1', cost: 'Reação (1 PE)', desc: 'Quando usa a ação esquiva, você pode gastar 1 PE para receber +5 na Defesa.', affinityDesc: 'Afinidade: Também recebe +5 em Reflexos e evasão aprimorada.' },
      { name: 'Causalidade Fortuita', category: 'Energia', element: 'Energia', req: 'Nenhum', cost: 'Passivo', desc: 'Em cenas de investigação, a DT para procurar pistas diminui em -5 para você.', affinityDesc: 'Afinidade: Você encontra uma pista adicional automaticamente.' },
      { name: 'Golpe de Sorte', category: 'Energia', element: 'Energia', req: 'Energia 1', cost: 'Passivo', desc: 'Sua margem de ameaça aumenta em +1 com todas as suas armas.', affinityDesc: 'Afinidade: Seu multiplicador de crítico também aumenta em +1.' },
      { name: 'Manipular Entropia', category: 'Energia', element: 'Energia', req: 'Energia 1', cost: 'Reação (2 PE)', desc: 'Quando outro ser em alcance curto faz um teste de perícia, você pode fazê-lo rolar novamente um dos dados.', affinityDesc: 'Afinidade: O alvo rola novamente todos os dados que você escolher.' }
    ];

    const RITUALS_COMPENDIUM = [
      // SANGUE 1º
      { name: 'Amaldiçoar Arma (Sangue)', element: 'Sangue', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 arma ou pacote de munição', duration: 'Cena', resist: 'Nenhuma', desc: 'Imbui a arma com fúria sanguínea, causando +1d6 de dano de Sangue.', discente: '(+2 PE) aumenta o dano bônus para +2d6.', verdadeira: '(+5 PE) aumenta o dano bônus para +4d6. Requer 3º círculo.' },
      { name: 'Arma Atroz', element: 'Sangue', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 arma corpo a corpo', duration: 'Sustentada', resist: 'Nenhuma', desc: 'A arma ganha +2 nos testes de ataque e +1 na margem de ameaça.', discente: '(+2 PE) muda o bônus para +5 no ataque.', verdadeira: '(+5 PE) muda para +5 no ataque, +2 na margem e +2 no multiplicador de crítico. Requer 3º círculo.' },
      { name: 'Armadura de Sangue', element: 'Sangue', circle: 1, cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: 'Cena', resist: 'Nenhuma', desc: 'Uma carapaça de sangue cristalizado recobre seu corpo, fornecendo +5 na Defesa.', discente: '(+5 PE) fornece +10 na Defesa e RD 5 contra balístico, corte, impacto e perfuração. Requer 3º círculo.', verdadeira: '(+9 PE) fornece +15 na Defesa e RD 10. Requer 4º círculo.' },
      { name: 'Corpo Adaptado', element: 'Sangue', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 pessoa ou animal', duration: 'Cena', resist: 'Nenhuma', desc: 'Você modifica a biologia do alvo, tornando-o imune a calor e frio extremos, capaz de respirar na água ou em fumaça densa.', discente: '(+2 PE) muda a duração para 1 dia.', verdadeira: '(+5 PE) muda o alcance para curto e o alvo para pessoas escolhidas.' },
      { name: 'Distorcer Aparência', element: 'Sangue', circle: 1, cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: 'Cena', resist: 'Vontade desacredita', desc: 'Modifica sua carne e ossos para assumir a aparência de outra pessoa, concedendo +10 em Enganação para disfarce.', discente: '(+2 PE) muda o alcance para curto e o alvo para 1 ser.', verdadeira: '(+5 PE) afeta até 5 seres voluntários em alcance curto.' },
      { name: 'Fortalecimento Sensorial', element: 'Sangue', circle: 1, cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: 'Cena', resist: 'Nenhuma', desc: 'Seus sentidos ficam sobre-humanos: você recebe +5 em Investigação, Luta, Percepção e Pontaria.', discente: '(+2 PE) inimigos não recebem bônus por flanquear você.', verdadeira: '(+5 PE) você não pode ser flanqueado nem ficar desprevenido. Requer 3º círculo.' },
      { name: 'Ódio Incontrolável', element: 'Sangue', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 pessoa', duration: 'Cena', resist: 'Nenhuma', desc: 'O alvo entra em frenesi: recebe +2 em ataques e dano corpo a corpo e RD 5 física, mas deve sempre atacar o ser mais próximo e não pode usar ações que exijam calma.', discente: '(+2 PE) concede um ataque corpo a corpo extra ao usar a ação agredir.', verdadeira: '(+5 PE) aumenta os bônus de ataque e dano para +5. Requer 3º círculo.' },
      // SANGUE 2º
      { name: 'Aprimorar Físico', element: 'Sangue', circle: 2, cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Cena', resist: 'Nenhuma', desc: 'A musculatura do alvo se expande, concedendo +1 em Agilidade ou Força à escolha.', discente: '(+3 PE) aumenta o bônus para +2.', verdadeira: '(+7 PE) aumenta o bônus para +3. Requer 4º círculo.' },
      { name: 'Descarnar', element: 'Sangue', circle: 2, cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Fortitude parcial', desc: 'Lacerações irrompem na pele do alvo, causando 6d8 de dano de corte e sangramento (2d6 por rodada).', discente: '(+3 PE) muda o dano inicial para 10d8.', verdadeira: '(+7 PE) o alvo sofre 10d8 e sangramento contínuo de 4d8 por turno. Requer 3º círculo.' },
      { name: 'Flagelo de Sangue', element: 'Sangue', circle: 2, cast: 'Padrão', range: 'Toque', target: '1 pessoa', duration: 'Cena', resist: 'Fortitude parcial', desc: 'Grava uma marca de dor no alvo e impõe uma ordem; se desobedecer, sofre 10d6 de dano de Sangue e fica enjoado.', discente: '(+3 PE) muda o alvo para 1 ser (inclusive criaturas).', verdadeira: '(+7 PE) muda a duração para 1 dia. Requer 4º círculo.' },
      { name: 'Hemofagia', element: 'Sangue', circle: 2, cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Fortitude reduz à metade', desc: 'Você arranca o sangue do alvo através da pele, causando 6d6 de dano de Sangue e recuperando PV iguais à metade do dano causado.', discente: '(+3 PE) você faz um ataque corpo a corpo e soma o dano do ritual ao ataque.', verdadeira: '(+7 PE) muda o alcance para pessoal e afeta todos os seres em alcance curto. Requer 4º círculo.' },
      { name: 'Transfusão Vital', element: 'Sangue', circle: 2, cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Você toca um aliado e transfere até 30 de seus próprios PV para curá-lo.', discente: '(+3 PE) você pode transferir até 50 PV.', verdadeira: '(+7 PE) você pode transferir até 100 PV. Requer 4º círculo.' },
      // SANGUE 3º & 4º
      { name: 'Ferver Sangue', element: 'Sangue', circle: 3, cast: 'Padrão', range: 'Curto', target: '1 ser', duration: 'Sustentada', resist: 'Fortitude parcial', desc: 'O sangue do alvo entra em ebulição, causando 4d8 de dano de Sangue por rodada e deixando-o fraco.', discente: 'Nenhum.', verdadeira: '(+4 PE) afeta todos os inimigos escolhidos em alcance curto. Requer 4º círculo.' },
      { name: 'Forma Monstruosa', element: 'Sangue', circle: 3, cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: 'Cena', resist: 'Nenhuma', desc: 'Você se transforma em uma aberração de Sangue Enorme: ganha +5 em ataques e dano corpo a corpo, 30 PV temporários e ataques naturais de 2d6.', discente: 'Nenhum.', verdadeira: '(+4 PE) ganha +10 em ataques e dano e 50 PV temporários. Requer 4º círculo.' },
      { name: 'Purgatório', element: 'Sangue', circle: 3, cast: 'Padrão', range: 'Curto', target: 'Área de 6m de raio', duration: 'Sustentada', resist: 'Fortitude parcial', desc: 'Cria uma poça de sangue fervente que causa 6d6 de dano de Sangue por turno e torna inimigos vulneráveis a dano físico.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Capturar o Coração', element: 'Sangue', circle: 4, cast: 'Padrão', range: 'Curto', target: '1 pessoa', duration: 'Cena', resist: 'Vontade parcial', desc: 'Desperta uma obsessão fanática no alvo, tornando-o seu aliado devoto que arriscará a vida por você.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Invólucro de Carne', element: 'Sangue', circle: 4, cast: 'Padrão', range: 'Curto', target: 'Cria 1 clone', duration: 'Cena', resist: 'Nenhuma', desc: 'Moldando sangue e carne, você cria uma cópia perfeita de si mesmo que você controla remotamente.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Vínculo de Sangue', element: 'Sangue', circle: 4, cast: 'Padrão', range: 'Curto', target: '1 ser', duration: 'Cena', resist: 'Fortitude anula', desc: 'Conecta sua vitalidade à do alvo: sempre que você sofrer dano, o alvo sofre metade desse dano no seu lugar.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },

      // MORTE 1º
      { name: 'Amaldiçoar Arma (Morte)', element: 'Morte', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 arma ou pacote de munição', duration: 'Cena', resist: 'Nenhuma', desc: 'Cobre a arma com lodo negro espiralado, causando +1d6 de dano de Morte.', discente: '(+2 PE) aumenta o dano bônus para +2d6.', verdadeira: '(+5 PE) aumenta o dano bônus para +4d6. Requer 3º círculo.' },
      { name: 'Cicatrização', element: 'Morte', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Acelera o tempo ao redor das feridas do alvo, recuperando 3d8+3 PV, mas envelhecendo o alvo em 1 ano.', discente: '(+2 PE) aumenta a cura para 5d8+5 PV.', verdadeira: '(+9 PE) muda o alcance para curto e cura 7d8+7 PV em todos os seres escolhidos. Requer 4º círculo.' },
      { name: 'Consumir Manancial', element: 'Morte', circle: 1, cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Suga a energia temporal de seres e plantas próximas, concedendo 3d6 PV temporários.', discente: '(+2 PE) aumenta os PV temporários para 6d6.', verdadeira: '(+5 PE) muda o alvo para seres em alcance curto e você ganha 3d6 PV temporários por alvo afetado. Requer 3º círculo.' },
      { name: 'Decadência', element: 'Morte', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Fortitude reduz à metade', desc: 'Espirais de trevas definham o alvo, causando 2d8+2 pontos de dano de Morte.', discente: '(+2 PE) muda a resistência para nenhuma e o dano para 3d8+3 como parte de um ataque corpo a corpo.', verdadeira: '(+5 PE) cria uma explosão de 6m que causa 8d8+8 de dano de Morte. Requer 3º círculo.' },
      { name: 'Definhar', element: 'Morte', circle: 1, cast: 'Padrão', range: 'Curto', target: '1 ser', duration: 'Cena', resist: 'Fortitude parcial', desc: 'Drena a vitalidade do alvo, deixando-o fatigado (ou vulnerável se passar na resistência).', discente: '(+2 PE) em vez de fatigado, o alvo fica exausto.', verdadeira: '(+5 PE) afeta até 5 seres em alcance curto. Requer 3º círculo.' },
      { name: 'Espiral da Perdição', element: 'Morte', circle: 1, cast: 'Padrão', range: 'Curto', target: '1 ser', duration: 'Cena', resist: 'Vontade reduz à metade', desc: 'Uma espiral hipnótica gira sobre o alvo, impondo -1d20 em seus testes de ataque.', discente: '(+2 PE) aumenta a penalidade para -2d20. Requer 2º círculo.', verdadeira: '(+5 PE) aumenta a penalidade para -2d20 e afeta até 5 alvos. Requer 3º círculo.' },
      { name: 'Nuvem de Cinzas', element: 'Morte', circle: 1, cast: 'Padrão', range: 'Curto', target: 'Nuvem de 6m de raio', duration: 'Cena', resist: 'Nenhuma', desc: 'Cria uma névoa espessa de fuligem que fornece camuflagem leve adjacente e camuflagem total a mais de 1,5m.', discente: '(+2 PE) você enxerga perfeitamente através da nuvem.', verdadeira: '(+5 PE) a nuvem asfixia inimigos, deixando-os lentos e enjoados. Requer 3º círculo.' },
      // MORTE 2º
      { name: 'Desacelerar Impacto', element: 'Morte', circle: 2, cast: 'Reação', range: 'Curto', target: '1 ser ou objeto', duration: 'Até atingir o solo', resist: 'Nenhuma', desc: 'Reduz a velocidade de queda de um alvo ou projétil, anulando dano de queda ou reduzindo dano de ataque à distância à metade.', discente: '(+3 PE) afeta até 5 alvos em alcance curto.', verdadeira: 'Nenhum.' },
      { name: 'Eco Espiral', element: 'Morte', circle: 2, cast: 'Padrão', range: 'Curto', target: '1 ser', duration: '2 rodadas (concentração)', resist: 'Fortitude reduz à metade', desc: 'Cria uma cópia de cinzas do alvo; no 2º turno de concentração, você a detona causando todo o dano que o alvo sofreu no turno anterior.', discente: '(+3 PE) muda o alvo para até 5 seres.', verdadeira: '(+7 PE) você pode detonar no 3º turno causando o dobro do dano acumulado. Requer 4º círculo.' },
      { name: 'Miasma Entrópico', element: 'Morte', circle: 2, cast: 'Padrão', range: 'Médio', target: 'Nuvem de 6m de raio', duration: 'Instantânea', resist: 'Fortitude parcial', desc: 'Explosão de gases tóxicos que causa 4d8 de dano químico e deixa os alvos enjoados por 1 rodada.', discente: '(+3 PE) muda o dano para 6d8 de Morte.', verdadeira: 'Nenhum.' },
      { name: 'Paradoxo', element: 'Morte', circle: 2, cast: 'Padrão', range: 'Médio', target: 'Esfera de 6m de raio', duration: 'Instantânea', resist: 'Fortitude reduz à metade', desc: 'Implosão temporal que causa 6d6 de dano de Morte em todos na área.', discente: '(+3 PE) cria uma anomalia que permanece por 1 cena causando 4d6 por turno a quem entrar.', verdadeira: '(+7 PE) muda o dano inicial para 13d6. Requer 4º círculo.' },
      { name: 'Velocidade Mortal', element: 'Morte', circle: 2, cast: 'Padrão', range: 'Curto', target: '1 ser', duration: 'Sustentada', resist: 'Nenhuma', desc: 'Acelera o fluxo temporal do alvo, concedendo uma ação de movimento adicional por turno.', discente: '(+3 PE) em vez de movimento, concede uma ação padrão adicional (não pode lançar rituais).', verdadeira: '(+7 PE) afeta até 5 alvos. Requer 4º círculo.' },
      // MORTE 3º & 4º
      { name: 'Âncora Temporal', element: 'Morte', circle: 3, cast: 'Padrão', range: 'Curto', target: '1 ser', duration: 'Cena', resist: 'Vontade parcial', desc: 'Prende o alvo no fluxo do tempo; ele não pode se teletransportar e precisa passar em Vontade todo turno para poder se deslocar.', discente: 'Nenhum.', verdadeira: '(+4 PE) afeta até 5 seres em alcance curto. Requer 4º círculo.' },
      { name: 'Poeira da Podridão', element: 'Morte', circle: 3, cast: 'Padrão', range: 'Médio', target: 'Nuvem de 6m de raio', duration: 'Sustentada', resist: 'Fortitude parcial', desc: 'Envelhece e decompõe matéria orgânica na área, causando 4d8+16 de dano de Morte por turno e impedindo cura.', discente: 'Nenhum.', verdadeira: '(+4 PE) muda o dano para 4d8+16 sem teste de resistência para reduzir. Requer 4º círculo.' },
      { name: 'Tentáculos de Lodo', element: 'Morte', circle: 3, cast: 'Padrão', range: 'Médio', target: 'Área de 6m de raio', duration: 'Cena', resist: 'Nenhuma', desc: 'Tentáculos negros emergem do chão, agarrando inimigos na área e causando 4d6 de dano de impacto/Morte por turno.', discente: 'Nenhum.', verdadeira: '(+4 PE) aumenta a área para 9m e o dano para 6d6. Requer 4º círculo.' },
      { name: 'Convocar o Algoz', element: 'Morte', circle: 4, cast: 'Padrão', range: '1 km', target: '1 pessoa', duration: 'Sustentada', resist: 'Vontade parcial', desc: 'Invoca uma aparição implacável da Morte que persegue a vítima e a reduz a 0 PV se a alcançar.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Distorção Temporal', element: 'Morte', circle: 4, cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: '3 rodadas', resist: 'Nenhuma', desc: 'Você cria um bolsão fora do tempo por 3 rodadas onde apenas você pode agir para preparar rituais e se curar (não pode afetar outros seres).', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Fim Inevitável', element: 'Morte', circle: 4, cast: 'Completa', range: 'Extremo', target: 'Buraco negro de 1,5m', duration: 'Sustentada', resist: 'Fortitude parcial', desc: 'Cria um ponto de singularidade de Morte que puxa tudo em alcance longo e causa 100 pontos de dano de Morte por rodada.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },

      // CONHECIMENTO 1º
      { name: 'Amaldiçoar Arma (Conhecimento)', element: 'Conhecimento', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 arma ou pacote de munição', duration: 'Cena', resist: 'Nenhuma', desc: 'Sigilos dourados percorrem a arma, causando +1d6 de dano de Conhecimento.', discente: '(+2 PE) aumenta o dano bônus para +2d6.', verdadeira: '(+5 PE) aumenta o dano bônus para +4d6. Requer 3º círculo.' },
      { name: 'Compreensão Paranormal', element: 'Conhecimento', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 ser ou objeto', duration: 'Cena', resist: 'Vontade anula', desc: 'Você compreende qualquer idioma escrito ou falado e pode ler os pensamentos superficiais de um alvo tocado.', discente: '(+2 PE) muda o alcance para curto e o alvo para até 5 seres.', verdadeira: '(+5 PE) você compreende a verdade absoluta de textos codificados e recebe +10 em Investigação. Requer 3º círculo.' },
      { name: 'Enfeitiçar', element: 'Conhecimento', circle: 1, cast: 'Padrão', range: 'Curto', target: '1 pessoa', duration: 'Cena', resist: 'Vontade anula', desc: 'Torna o alvo prestativo em relação a você, concedendo +10 em testes de Diplomacia com ele.', discente: '(+2 PE) muda o alvo para 1 animal ou pessoa e permite sugerir uma ação razoável.', verdadeira: '(+5 PE) afeta até 5 pessoas em alcance curto. Requer 3º círculo.' },
      { name: 'Perturbação', element: 'Conhecimento', circle: 1, cast: 'Padrão', range: 'Curto', target: '1 pessoa', duration: '1 rodada', resist: 'Vontade anula', desc: 'Você dá uma ordem mental irresistível ao alvo (Fuja, Largue, Pare, Sente-se ou Venha).', discente: '(+2 PE) muda o alvo para 1 ser e adiciona a ordem "Sofra" (causa 3d8 de dano de Conhecimento).', verdadeira: '(+5 PE) afeta até 5 seres em alcance curto. Requer 3º círculo.' },
      { name: 'Ouvir os Sussurros', element: 'Conhecimento', circle: 1, cast: 'Completa', range: 'Pessoal', target: 'Você', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Você consulta as vozes do Conhecimento sobre uma ação futura, recebendo uma resposta enigmática ("Sim", "Não" ou "Talvez").', discente: '(+2 PE) muda a execução para 1 minuto e permite fazer 3 perguntas.', verdadeira: '(+5 PE) recebe uma visão clara de até 1 cena futura. Requer 3º círculo.' },
      { name: 'Tercer Olho', element: 'Conhecimento', circle: 1, cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: 'Cena', resist: 'Nenhuma', desc: 'Você enxerga auras paranormais em alcance médio, identificando elementos e intensidade de rituais ou itens.', discente: '(+2 PE) muda a duração para 1 dia.', verdadeira: '(+5 PE) você enxerga criaturas e objetos invisíveis. Requer 3º círculo.' },
      // CONHECIMENTO 2º
      { name: 'Aprimorar Mente', element: 'Conhecimento', circle: 2, cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Cena', resist: 'Nenhuma', desc: 'Expande a capacidade cognitiva do alvo, concedendo +1 em Intelecto ou Presença à escolha.', discente: '(+3 PE) aumenta o bônus para +2.', verdadeira: '(+7 PE) aumenta o bônus para +3. Requer 4º círculo.' },
      { name: 'Detecção de Ameaças', element: 'Conhecimento', circle: 2, cast: 'Padrão', range: 'Pessoal', target: 'Esfera de 18m de raio', duration: 'Cena', resist: 'Nenhuma', desc: 'Você sente instantaneamente perigos, armadilhas e intenções hostis ao redor, não podendo ser surpreendido.', discente: '(+3 PE) aumenta o raio para 36m e a duração para 1 dia.', verdadeira: '(+7 PE) revela a localização exata de todos os perigos na área. Requer 4º círculo.' },
      { name: 'Esconder dos Olhos', element: 'Conhecimento', circle: 2, cast: 'Livre', range: 'Pessoal', target: 'Você', duration: '1 rodada', resist: 'Nenhuma', desc: 'Apaga sua presença da percepção alheia, tornando-o invisível (+15 em Furtividade).', discente: '(+3 PE) muda a duração para sustentada.', verdadeira: '(+7 PE) afeta você e até 5 aliados adjacentes. Requer 4º círculo.' },
      { name: 'Invadir Mente', element: 'Conhecimento', circle: 2, cast: 'Padrão', range: 'Médio', target: '1 ser', duration: 'Instantânea ou sustentada', resist: 'Vontade parcial', desc: 'Dispara uma rajada psíquica que causa 6d6 de dano de Conhecimento e deixa o alvo atordoado por 1 rodada.', discente: '(+3 PE) muda o dano para 10d6.', verdadeira: '(+7 PE) permite criar um elo telepático permanente ou causar 10d6 em até 5 alvos. Requer 4º círculo.' },
      { name: 'Localização', element: 'Conhecimento', circle: 2, cast: 'Padrão', range: 'Pessoal', target: 'Círculo de 90m de raio', duration: 'Cena', resist: 'Nenhuma', desc: 'Você sabe a direção e distância exatas de uma pessoa ou objeto que conheça bem.', discente: '(+3 PE) aumenta o alcance para 1 km.', verdadeira: '(+7 PE) aumenta o alcance para 10 km. Requer 4º círculo.' },
      // CONHECIMENTO 3º & 4º
      { name: 'Alterar Memória', element: 'Conhecimento', circle: 3, cast: 'Padrão', range: 'Toque', target: '1 pessoa', duration: 'Instantânea', resist: 'Vontade anula', desc: 'Reescreve ou apaga até 1 hora de memórias recentes do alvo.', discente: 'Nenhum.', verdadeira: '(+4 PE) pode alterar até 24 horas de memórias e muda o alcance para curto. Requer 4º círculo.' },
      { name: 'Contato Paranormal', element: 'Conhecimento', circle: 3, cast: 'Completa', range: 'Pessoal', target: 'Você', duration: '1 dia', resist: 'Nenhuma', desc: 'Você barganha com a entidade de Conhecimento e recebe 6d6 para adicionar a testes de perícia ao longo do dia (1s causam perda de SAN).', discente: 'Nenhum.', verdadeira: '(+4 PE) muda os dados para 6d8. Requer 4º círculo.' },
      { name: 'Vidência', element: 'Conhecimento', circle: 3, cast: 'Completa', range: 'Ilimitado', target: '1 ser', duration: 'Sustentada', resist: 'Vontade anula', desc: 'Através de uma superfície reflexiva, você vê e ouve um alvo em qualquer lugar do mundo.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Controle Mental', element: 'Conhecimento', circle: 4, cast: 'Padrão', range: 'Médio', target: '1 pessoa ou animal', duration: 'Sustentada', resist: 'Vontade parcial', desc: 'Você domina completamente a mente do alvo e controla suas ações.', discente: 'Nenhum.', verdadeira: '(+5 PE) afeta até 5 alvos.' },
      { name: 'Inexistir', element: 'Conhecimento', circle: 4, cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Vontade parcial', desc: 'Apaga o alvo da realidade, causando 10d12+10 de dano de Conhecimento; se reduzido a 0 PV, é desintegrado sem deixar vestígios.', discente: 'Nenhum.', verdadeira: '(+5 PE) muda o dano para 15d12+15.' },
      { name: 'Possessão', element: 'Conhecimento', circle: 4, cast: 'Padrão', range: 'Longo', target: '1 pessoa viva ou morta', duration: '1 dia', resist: 'Vontade anula', desc: 'Você projeta sua consciência no corpo do alvo, assumindo controle total enquanto seu corpo fica inerte.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },

      // ENERGIA 1º
      { name: 'Amaldiçoar Arma (Energia)', element: 'Energia', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 arma ou pacote de munição', duration: 'Cena', resist: 'Nenhuma', desc: 'Arcos voltaicos e chamas caóticas envolvem a arma, causando +1d6 de dano de Energia.', discente: '(+2 PE) aumenta o dano bônus para +2d6.', verdadeira: '(+5 PE) aumenta o dano bônus para +4d6. Requer 3º círculo.' },
      { name: 'Amaldiçoar Tecnologia', element: 'Energia', circle: 1, cast: 'Padrão', range: 'Toque', target: '1 acessório ou arma de fogo', duration: 'Cena', resist: 'Nenhuma', desc: 'Energia caótica otimiza o equipamento, concedendo uma modificação a sua escolha durante a cena.', discente: '(+2 PE) concede duas modificações.', verdadeira: '(+5 PE) concede três modificações. Requer 3º círculo.' },
      { name: 'Coincidência Forçada', element: 'Energia', circle: 1, cast: 'Padrão', range: 'Curto', target: '1 ser', duration: 'Cena', resist: 'Nenhuma', desc: 'Altera as probabilidades ao redor do alvo, concedendo +2 em todos os testes de perícia.', discente: '(+2 PE) afeta até 5 aliados em alcance curto.', verdadeira: '(+5 PE) aumenta o bônus para +5 em todos os testes. Requer 3º círculo.' },
      { name: 'Eletrocussão', element: 'Energia', circle: 1, cast: 'Padrão', range: 'Curto', target: '1 ser ou objeto', duration: 'Instantânea', resist: 'Fortitude parcial', desc: 'Dispara um raio de alta voltagem que causa 3d6 de dano de Energia e deixa o alvo vulnerável por 1 rodada.', discente: '(+2 PE) muda o dano para 6d6.', verdadeira: '(+5 PE) cria um arco elétrico que atinge até 5 alvos causando 6d6 em cada. Requer 3º círculo.' },
      { name: 'Embaralhar', element: 'Energia', circle: 1, cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: 'Cena', resist: 'Nenhuma', desc: 'Cria 3 cópias ilusórias de você; cada cópia fornece +2 na Defesa (+6 total) e é destruída se um ataque errar você por pouco.', discente: '(+2 PE) cria 5 cópias (+10 na Defesa).', verdadeira: '(+5 PE) cria 8 cópias (+16 na Defesa). Requer 3º círculo.' },
      { name: 'Luz', element: 'Energia', circle: 1, cast: 'Padrão', range: 'Curto', target: '1 objeto', duration: 'Cena', resist: 'Vontade anula', desc: 'Faz um objeto emitir luz neon colorida em 9m de raio.', discente: '(+2 PE) a luz fica ofuscante, deixando inimigos próximos ofuscados.', verdadeira: '(+5 PE) a luz purifica trevas paranormais e concede +5 em testes contra Morte.' },
      { name: 'Polarização Caótica', element: 'Energia', circle: 1, cast: 'Padrão', range: 'Curto', target: 'Você ou objetos metálicos', duration: 'Sustentada', resist: 'Vontade anula', desc: 'Gera um campo magnético intenso que permite atrair ou repelir objetos de metal (até espaço 2) ou ganhar +5 na Defesa contra armas metálicas.', discente: '(+2 PE) arremessa até 10 objetos causando 1d6 de dano cada.', verdadeira: '(+5 PE) repele todos os projéteis metálicos contra você. Requer 3º círculo.' },
      // ENERGIA 2º
      { name: 'Chamas do Caos', element: 'Energia', circle: 2, cast: 'Padrão', range: 'Curto', target: '1 ser ou área', duration: 'Cena', resist: 'Reflexos reduz à metade', desc: 'Manipula chamas plasmáticas; como ação de movimento, dispara labaredas que causam 3d6 de dano de Energia/fogo.', discente: '(+3 PE) aumenta o dano para 6d6.', verdadeira: '(+7 PE) cria uma tempestade de fogo de 6m de raio causando 8d6. Requer 4º círculo.' },
      { name: 'Contenção Fantasmagórica', element: 'Energia', circle: 2, cast: 'Padrão', range: 'Médio', target: '1 ser', duration: 'Cena', resist: 'Reflexos anula', desc: 'Laços de energia pura prendem o alvo, deixando-o agarrado (cada laço tem 20 PV e RD 5).', discente: '(+3 PE) aumenta para 3 laços simultâneos.', verdadeira: '(+7 PE) afeta até 5 alvos em alcance médio. Requer 4º círculo.' },
      { name: 'Dissonância Acústica', element: 'Energia', circle: 2, cast: 'Padrão', range: 'Médio', target: 'Esfera de 6m de raio', duration: 'Sustentada', resist: 'Nenhuma', desc: 'Cria uma zona de silêncio absoluto onde nenhum som é emitido e rituais com componentes verbais não podem ser lançados.', discente: '(+3 PE) o alvo do silêncio pode ser uma criatura ou objeto móvel.', verdadeira: '(+7 PE) causa 4d6 de dano sônico por turno a inimigos na área. Requer 4º círculo.' },
      { name: 'Sopro do Caos', element: 'Energia', circle: 2, cast: 'Padrão', range: 'Médio', target: 'Área de 9m', duration: 'Sustentada', resist: 'Fortitude parcial', desc: 'Controla correntes de ar violentas para empurrar inimigos, dispersar névoas ou conceder voo de 12m.', discente: '(+3 PE) aumenta a força dos ventos, derrubando alvos Grandes ou menores.', verdadeira: '(+7 PE) cria um tornado devastador. Requer 4º círculo.' },
      { name: 'Tela de Ruído', element: 'Energia', circle: 2, cast: 'Padrão ou Reação', range: 'Pessoal', target: 'Você', duration: 'Cena ou instantânea', resist: 'Nenhuma', desc: 'Cria uma película de estática que concede 30 PV temporários contra dano físico (ou reduz dano sofrido em 15 como reação).', discente: '(+3 PE) aumenta para 60 PV temporários (ou redução de 30 como reação).', verdadeira: '(+7 PE) cria uma esfera impenetrável com 100 PV. Requer 4º círculo.' },
      // ENERGIA 3º & 4º
      { name: 'Convocação Instantânea', element: 'Energia', circle: 3, cast: 'Padrão', range: 'Ilimitado', target: '1 objeto preparado', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Teletransporta instantaneamente um objeto previamente marcado com o símbolo de Energia para sua mão.', discente: 'Nenhum.', verdadeira: '(+4 PE) pode convocar um contêiner de até 10 espaços. Requer 4º círculo.' },
      { name: 'Salto Fantasma', element: 'Energia', circle: 3, cast: 'Padrão', range: 'Médio', target: 'Você', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Você se desfaz em faíscas e reaparece em qualquer ponto visível em alcance médio.', discente: '(+2 PE) muda a execução para reação para esquivar de um ataque (+10 Defesa).', verdadeira: '(+4 PE) leva até 5 aliados voluntários adjacentes com você. Requer 4º círculo.' },
      { name: 'Transfigurar Água', element: 'Energia', circle: 3, cast: 'Padrão', range: 'Longo', target: 'Esfera de 30m de raio', duration: 'Cena', resist: 'Varia', desc: 'Congela, evapora ou cria ondas gigantescas em grandes volumes de água.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Alterar Destino', element: 'Energia', circle: 4, cast: 'Reação', range: 'Pessoal', target: 'Você', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Você reescreve a probabilidade de um evento: recebe +15 em um teste de resistência ou na Defesa contra um ataque.', discente: 'Nenhum.', verdadeira: '(+5 PE) muda o alcance para curto e o alvo para 1 aliado.' },
      { name: 'Deflagração de Energia', element: 'Energia', circle: 4, cast: 'Completa', range: 'Pessoal', target: 'Explosão de 15m', duration: 'Instantânea', resist: 'Fortitude reduz à metade', desc: 'Libera uma explosão cataclísmica de plasma que causa 150 pontos de dano de Energia em todos na área e desativa eletrônicos.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Teletransporte', element: 'Energia', circle: 4, cast: 'Padrão', range: 'Toque', target: 'Você e até 5 aliados', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Transporta o grupo instantaneamente para qualquer local que você já tenha visitado (teste de Ocultismo DT 25 a 35).', discente: 'Nenhum.', verdadeira: 'Nenhum.' },

      // MEDO 1º ao 4º
      { name: 'Cinerária', element: 'Medo', circle: 1, cast: 'Padrão', range: 'Curto', target: 'Nuvem de 6m de raio', duration: 'Cena', resist: 'Nenhuma', desc: 'Cria uma névoa sobrenatural do Outro Lado: rituais lançados dentro dela têm sua DT aumentada em +2 e custo reduzido em -1 PE.', discente: '(+2 PE) a DT aumenta em +5.', verdadeira: '(+5 PE) todos os rituais lançados na névoa causam dano máximo.' },
      { name: 'Proteção contra Rituais', element: 'Medo', circle: 2, cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Cena', resist: 'Nenhuma', desc: 'Concede +5 em testes de resistência contra rituais e RD 10 contra dano paranormal.', discente: '(+3 PE) afeta até 5 alvos.', verdadeira: '(+7 PE) aumenta a RD paranormal para 20.' },
      { name: 'Rejeitar Névoa', element: 'Medo', circle: 2, cast: 'Padrão', range: 'Curto', target: 'Nuvem de 6m de raio', duration: 'Cena', resist: 'Nenhuma', desc: 'Suprime a Membrana na área: rituais lançados dentro dela custam +2 PE por círculo e têm a DT reduzida em -5.', discente: '(+3 PE) aumenta o raio para 12m.', verdadeira: '(+7 PE) impede completamente a conjuração de rituais de 1º e 2º círculo na área.' },
      { name: 'Dissipar Ritual', element: 'Medo', circle: 3, cast: 'Padrão', range: 'Médio', target: '1 ser, objeto ou esfera de 3m', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Você faz um teste de Ocultismo contra a DT de rituais ativos no alvo para encerrá-los imediatamente.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Canalizar o Medo', element: 'Medo', circle: 4, exclusivePath: 'Conduíte', cast: 'Padrão', range: 'Toque', target: '1 pessoa', duration: 'Permanente até ser descarregado', resist: 'Nenhuma', desc: 'Exclusivo de Conduíte: transfere um ritual que você conhece para outra pessoa poder conjurá-lo uma vez.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Conhecendo o Medo', element: 'Medo', circle: 4, exclusivePath: 'Graduado', cast: 'Padrão', range: 'Toque', target: '1 pessoa', duration: 'Instantânea', resist: 'Vontade parcial', desc: 'Exclusivo de Graduado: revela a verdade absoluta do Outro Lado ao alvo, reduzindo sua Sanidade a 0 se falhar.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Lâmina do Medo', element: 'Medo', circle: 4, exclusivePath: 'Lâmina Paranormal', cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: 'Cena', resist: 'Fortitude parcial', desc: 'Exclusivo de Lâmina Paranormal: manifesta uma espada de Medo puro; ao acertar um golpe, reduz os PV do alvo a 0 se falhar em Fortitude.', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Medo Tangível', element: 'Medo', circle: 4, exclusivePath: 'Flagelador', cast: 'Padrão', range: 'Pessoal', target: 'Você', duration: 'Cena', resist: 'Nenhuma', desc: 'Exclusivo de Flagelador: você se torna parcialmente incorpóreo e imune a dano físico comum (balístico, corte, impacto e perfuração).', discente: 'Nenhum.', verdadeira: 'Nenhum.' },
      { name: 'Presença do Medo', element: 'Medo', circle: 4, exclusivePath: 'Intuitivo', cast: 'Padrão', range: 'Pessoal', target: 'Emanação de 9m', duration: 'Sustentada', resist: 'Vontade parcial', desc: 'Exclusivo de Intuitivo: irradia terror puro que deixa inimigos próximos apavorados e sofrendo 5d8 de dano mental por turno.', discente: 'Nenhum.', verdadeira: 'Nenhum.' }
    ];

    const ITEMS_COMPENDIUM = [
      // Armas Simples Corpo a Corpo
      { name: 'Faca', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d4', crit: '19/x2', desc: 'Arma simples leve, ágil, arremesso (curto). Corte.' },
      { name: 'Martelo', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d6', crit: 'x2', desc: 'Arma simples leve. Impacto.' },
      { name: 'Punhal', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d4', crit: 'x3', desc: 'Arma simples leve, ágil. Perfuração.' },
      { name: 'Bastão', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d6', crit: 'x2', desc: 'Arma simples uma mão (1d8 se usada com duas mãos). Impacto.' },
      { name: 'Machete', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d6', crit: '19/x2', desc: 'Arma simples uma mão. Corte.' },
      { name: 'Lança', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d6', crit: 'x2', desc: 'Arma simples uma mão, arremesso (curto). Perfuração.' },
      { name: 'Cajado', type: 'Arma', cat: '0', spaces: 2, skill: 'Luta', damage: '1d6', crit: 'x2', desc: 'Arma simples duas mãos, ágil. Impacto.' },

      // Armas Simples Disparo / Fogo
      { name: 'Arco', type: 'Arma', cat: '0', spaces: 2, skill: 'Pontaria', damage: '1d6', crit: 'x3', desc: 'Arma simples duas mãos, alcance médio. Usa Flechas.' },
      { name: 'Besta', type: 'Arma', cat: '0', spaces: 2, skill: 'Pontaria', damage: '1d8', crit: '19/x2', desc: 'Arma simples duas mãos, alcance médio. Usa Flechas.' },
      { name: 'Pistola', type: 'Arma', cat: 'I', spaces: 1, skill: 'Pontaria', damage: '1d12', crit: '18/x2', desc: 'Arma simples leve, alcance curto. Usa Balas Curtas.' },
      { name: 'Revólver', type: 'Arma', cat: 'I', spaces: 1, skill: 'Pontaria', damage: '2d6', crit: '19/x3', desc: 'Arma simples leve, alcance curto. Usa Balas Curtas.' },
      { name: 'Fuzil de Caça', type: 'Arma', cat: 'I', spaces: 2, skill: 'Pontaria', damage: '2d8', crit: '19/x3', desc: 'Arma simples duas mãos, alcance médio. Usa Balas Longas.' },

      // Armas Táticas Corpo a Corpo
      { name: 'Machadinha', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d6', crit: 'x3', desc: 'Arma tática leve, arremesso (curto). Corte.' },
      { name: 'Foice Curta', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d6', crit: '20/x3', desc: 'Arma tática leve: ferramenta agrícola de cabo curto e lâmina curva afiada na parte interna, usada em rituais de colheita ou improvisada por sobreviventes. Ágil (usa Agilidade nos testes de ataque e no dano) e compatível com Combater com Duas Armas. Corte. Regra opcional — Enganchar: +2 em testes de manobra para derrubar ou desarmar oponentes adjacentes.' },
      { name: 'Nunchaku', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d8', crit: 'x2', desc: 'Arma tática leve, ágil. Impacto.' },
      { name: 'Corrente', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d8', crit: 'x2', desc: 'Arma tática uma mão (+2 em derrubar/desarmar). Impacto.' },
      { name: 'Espada', type: 'Arma', cat: 'I', spaces: 1, skill: 'Luta', damage: '1d8', crit: '19/x2', desc: 'Arma tática uma mão (1d10 com duas mãos). Corte.' },
      { name: 'Florete', type: 'Arma', cat: 'I', spaces: 1, skill: 'Luta', damage: '1d6', crit: '18/x2', desc: 'Arma tática uma mão, ágil. Perfuração.' },
      { name: 'Machado', type: 'Arma', cat: 'I', spaces: 1, skill: 'Luta', damage: '1d8', crit: 'x3', desc: 'Arma tática uma mão. Corte.' },
      { name: 'Maça', type: 'Arma', cat: 'I', spaces: 1, skill: 'Luta', damage: '2d4', crit: 'x2', desc: 'Arma tática uma mão. Impacto.' },
      { name: 'Acha', type: 'Arma', cat: 'I', spaces: 2, skill: 'Luta', damage: '1d12', crit: 'x3', desc: 'Arma tática duas mãos. Corte.' },
      { name: 'Gadanho', type: 'Arma', cat: 'I', spaces: 2, skill: 'Luta', damage: '2d4', crit: 'x4', desc: 'Arma tática duas mãos. Corte.' },
      { name: 'Katana', type: 'Arma', cat: 'I', spaces: 2, skill: 'Luta', damage: '1d10', crit: '19/x2', desc: 'Arma tática duas mãos, ágil (pode usar com 1 mão se Veterano em Luta).' },
      { name: 'Marreta', type: 'Arma', cat: 'I', spaces: 2, skill: 'Luta', damage: '3d4', crit: 'x2', desc: 'Arma tática duas mãos. Impacto.' },
      { name: 'Montante', type: 'Arma', cat: 'I', spaces: 2, skill: 'Luta', damage: '2d6', crit: '19/x2', desc: 'Arma tática duas mãos. Corte.' },
      { name: 'Motosserra', type: 'Arma', cat: 'I', spaces: 2, skill: 'Luta', damage: '3d6', crit: 'x2', desc: 'Arma tática duas mãos (dados de dano 6 rolam novamente). Corte.' },

      // Armas Táticas Disparo / Fogo & Pesadas
      { name: 'Arco Composto', type: 'Arma', cat: 'I', spaces: 2, skill: 'Pontaria', damage: '1d10', crit: 'x3', desc: 'Arma tática duas mãos, soma FOR no dano, alcance médio.' },
      { name: 'Balestra', type: 'Arma', cat: 'I', spaces: 2, skill: 'Pontaria', damage: '1d12', crit: '19/x2', desc: 'Arma tática duas mãos, alcance médio.' },
      { name: 'Submetralhadora', type: 'Arma', cat: 'I', spaces: 1, skill: 'Pontaria', damage: '2d6', crit: '19/x3', desc: 'Arma tática uma mão, automática, alcance curto. Balas Curtas.' },
      { name: 'Espingarda', type: 'Arma', cat: 'I', spaces: 2, skill: 'Pontaria', damage: '4d6', crit: 'x3', desc: 'Arma tática duas mãos, alcance curto. Cartuchos.' },
      { name: 'Fuzil de Assalto', type: 'Arma', cat: 'II', spaces: 2, skill: 'Pontaria', damage: '2d10', crit: '19/x3', desc: 'Arma tática duas mãos, automática, alcance médio. Balas Longas.' },
      { name: 'Fuzil de Precisão', type: 'Arma', cat: 'III', spaces: 2, skill: 'Pontaria', damage: '2d10', crit: '19/x3', desc: 'Arma tática duas mãos, +5 margem de ameaça se mirar, alcance longo.' },
      { name: 'Bazuca (Arma Pesada)', type: 'Arma', cat: 'III', spaces: 2, skill: 'Pontaria', damage: '10d8', crit: 'x2', desc: 'Arma pesada duas mãos, explosão 3m, alcance médio. Foguetes.' },
      { name: 'Lança-Chamas (Arma Pesada)', type: 'Arma', cat: 'III', spaces: 2, skill: 'Pontaria', damage: '6d6', crit: 'x2', desc: 'Arma pesada duas mãos, linha de 9m, deixa em chamas.' },
      { name: 'Metralhadora (Arma Pesada)', type: 'Arma', cat: 'II', spaces: 2, skill: 'Pontaria', damage: '2d12', crit: '19/x3', desc: 'Arma pesada duas mãos, automática, requer FOR 4 ou tripé.' },

      // Proteções
      { name: 'Proteção Leve', type: 'Proteção', cat: 'I', spaces: 2, defense: 5, desc: 'Jaqueta de couro reforçada ou colete leve de kevlar (+5 Defesa).' },
      { name: 'Proteção Pesada', type: 'Proteção', cat: 'II', spaces: 5, defense: 10, desc: 'Armadura tática completa (+10 Defesa, RD 2 física, -5 em Acrobacia, Crime e Furtividade).' },
      { name: 'Escudo', type: 'Proteção', cat: 'I', spaces: 2, defense: 2, desc: 'Escudo balístico (+2 Defesa, ocupa uma mão).' },

      // Munições e Explosivos
      { name: 'Balas Curtas (Pacote)', type: 'Munição/Explosivo', cat: '0', spaces: 1, desc: 'Munição para pistolas, revólveres e submetralhadoras (dura 1 cena).' },
      { name: 'Balas Longas (Pacote)', type: 'Munição/Explosivo', cat: 'I', spaces: 1, desc: 'Munição para fuzis e metralhadoras (dura 1 cena).' },
      { name: 'Cartuchos (Pacote)', type: 'Munição/Explosivo', cat: 'I', spaces: 1, desc: 'Munição para espingardas (dura 1 cena).' },
      { name: 'Flechas (Aljava)', type: 'Munição/Explosivo', cat: '0', spaces: 1, desc: 'Virotes e flechas reutilizáveis para arcos e bestas.' },
      { name: 'Granada de Fragmentação', type: 'Munição/Explosivo', cat: 'I', spaces: 1, desc: 'Explosão de 6m de raio, causa 8d6 de dano de perfuração (Reflexos reduz).' },
      { name: 'Granada Incendiária', type: 'Munição/Explosivo', cat: 'I', spaces: 1, desc: 'Explosão de 6m de raio, causa 6d6 de dano de fogo e deixa em chamas.' },
      { name: 'Granada de Atordoamento', type: 'Munição/Explosivo', cat: '0', spaces: 1, desc: 'Explosão de 6m de raio, deixa alvos atordoados por 1 rodada (Fortitude reduz).' },
      { name: 'Granada de Fumaça', type: 'Munição/Explosivo', cat: '0', spaces: 1, desc: 'Cria nuvem de fumaça densa de 6m por 2 rodadas.' },
      { name: 'Mina Antipessoal', type: 'Munição/Explosivo', cat: 'I', spaces: 1, desc: 'Cone de 6m, causa 12d6 de dano de perfuração ao ser acionada.' },

      // Equipamentos Gerais
      { name: 'Kit de Perícia', type: 'Geral', cat: '0', spaces: 1, desc: 'Conjunto de ferramentas necessárias para evitar penalidade de -5 em perícias específicas.' },
      { name: 'Utensílio (+2 Perícia)', type: 'Geral', cat: 'I', spaces: 1, desc: 'Item especializado que concede +2 em uma perícia escolhida (exceto Luta e Pontaria).' },
      { name: 'Vestimenta (+2 Perícia)', type: 'Geral', cat: 'I', spaces: 1, desc: 'Traje adequado que concede +2 em uma perícia escolhida (exceto Luta e Pontaria).' },
      { name: 'Mochila Militar', type: 'Geral', cat: 'I', spaces: 0, desc: 'Aumenta sua capacidade de carga em +2 espaços (aplicado automaticamente!).' },
      { name: 'Cicatrizante', type: 'Geral', cat: 'I', spaces: 1, desc: 'Spray medicinal de uso único que cura 2d8+2 PV.' },
      { name: 'Lanterna Tática', type: 'Geral', cat: 'I', spaces: 1, desc: 'Ilumina cone de 9m; pode ofuscar um inimigo em alcance curto como ação de movimento.' },
      { name: 'Máscara de Gás', type: 'Geral', cat: '0', spaces: 1, desc: 'Concede +10 em testes de Fortitude contra efeitos transmitidos pelo ar.' },
      { name: 'Óculos de Visão Térmica', type: 'Geral', cat: 'I', spaces: 1, desc: 'Ignora penalidades de camuflagem por escuridão e fumaça.' },
      { name: 'Pé de Cabra', type: 'Geral', cat: '0', spaces: 1, desc: 'Concede +5 em Força para arrombar portas e pode ser usado como bastão.' },
      { name: 'Corda / Gancho de Escalada', type: 'Geral', cat: '0', spaces: 1, desc: 'Concede +5 em Atletismo para escalar.' },
      { name: 'Algemas', type: 'Geral', cat: '0', spaces: 1, desc: 'Prende os pulsos de um alvo indefeso ou agarrado (Acrobacia DT 30 para escapar).' },
      { name: 'Binóculos', type: 'Geral', cat: '0', spaces: 1, desc: 'Elimina penalidade por distância em testes de Percepção.' },
      { name: 'Equipamento de Sobrevivência', type: 'Geral', cat: '0', spaces: 2, desc: 'Saco de dormir, bússola e rações; concede +5 em Sobrevivência.' },

      // Itens Paranormais
      { name: 'Componentes Ritualísticos (Sangue)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Órgãos preservados, arames e cinzas necessários para conjurar rituais de Sangue.' },
      { name: 'Componentes Ritualísticos (Morte)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Ossos pulverizados, lodo seco e relógios quebrados para rituais de Morte.' },
      { name: 'Componentes Ritualísticos (Conhecimento)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Pergaminhos, ouro em pó e incensos para rituais de Conhecimento.' },
      { name: 'Componentes Ritualísticos (Energia)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Baterias, cristais e fios de cobre para rituais de Energia.' },
      { name: 'Amarras de (Elemento)', type: 'Paranormal', cat: 'II', spaces: 1, desc: 'Correntes paranormais (+10 em testes para agarrar criaturas do elemento oposto).' },
      { name: 'Câmera de Aura Paranormal', type: 'Paranormal', cat: 'II', spaces: 1, desc: 'Fotografa auras paranormais invisíveis a olho nu (gasta 1 PE por foto).' },
      { name: 'Emissor de Pulsos Paranormais', type: 'Paranormal', cat: 'II', spaces: 1, desc: 'Caixa que atrai criaturas de um elemento específico em alcance médio.' },
      { name: 'Escuta de Ruídos Paranormais', type: 'Paranormal', cat: 'II', spaces: 1, desc: 'Capta sussurros do Outro Lado (+5 em Ocultismo para identificar fenômenos).' },
      { name: 'Medidor de Estabilidade da Membrana', type: 'Paranormal', cat: 'II', spaces: 1, desc: 'Indica o estado da Membrana local (Intacta, Estável, Danificada ou Rompida).' },
      { name: 'Scanner de Manifestação Paranormal', type: 'Paranormal', cat: 'II', spaces: 1, desc: 'Detecta presença de entidades e itens amaldiçoados em até 30m.' },
      { name: 'Crânio Espiral', type: 'Paranormal', cat: 'II', spaces: 1, desc: 'Item Amaldiçoado (Morte): Uma vez por rodada, pode gastar 1 ação livre para ganhar 1 ação padrão extra (teste de Vontade para não envelhecer).' },
      { name: 'Dedos Decepados', type: 'Paranormal', cat: 'II', spaces: 1, desc: 'Item Amaldiçoado: Concede acesso a um poder paranormal específico enquanto empunhado.' },
      { name: 'Pérola de Sangue', type: 'Paranormal', cat: 'II', spaces: 1, desc: 'Item Amaldiçoado (Sangue): Absorve o sangue do portador para conceder +5 em testes de atributo físico.' },
      { name: 'Relógio do Arnaldo', type: 'Paranormal', cat: 'IV', spaces: 1, desc: 'Relíquia menor: Permite rolar novamente testes falhos manipulando a sorte e o tempo.' },

      // Modificações (+1 Cat cada)
      { name: '[Modificação] Arma Certeira', type: 'Modificação', cat: 'I', spaces: 0, desc: 'Aumenta a categoria da arma em +I. Concede +2 nos testes de ataque.' },
      { name: '[Modificação] Arma Cruel', type: 'Modificação', cat: 'I', spaces: 0, desc: 'Aumenta a categoria da arma em +I. Concede +2 nas rolagens de dano.' },
      { name: '[Modificação] Arma Perigosa', type: 'Modificação', cat: 'I', spaces: 0, desc: 'Aumenta a categoria da arma em +I. Aumenta a margem de ameaça em +2.' },
      { name: '[Modificação] Arma Calibre Grosso', type: 'Modificação', cat: 'I', spaces: 0, desc: 'Aumenta a categoria da arma de fogo em +I. Aumenta o dano em mais um dado do mesmo tipo.' },
      { name: '[Modificação] Mira Telescópica', type: 'Modificação', cat: 'I', spaces: 0, desc: 'Aumenta a categoria da arma de disparo em +I. Aumenta o alcance em um passo e permite mirar para ataque furtivo.' },
      { name: '[Modificação] Silenciador', type: 'Modificação', cat: 'I', spaces: 0, desc: 'Aumenta a categoria da arma de fogo em +I. Reduz penalidade de Furtividade após disparar em -10.' },
      { name: '[Modificação] Proteção Reforçada', type: 'Modificação', cat: 'I', spaces: 0, desc: 'Aumenta a categoria da proteção em +I e aumenta o bônus na Defesa em +2.' },
      { name: '[Modificação] Acessório Aprimorado', type: 'Modificação', cat: 'I', spaces: 0, desc: 'Aumenta a categoria do utensílio/vestimenta em +I e aumenta o bônus de perícia para +5.' },

      // Maldições (+1 Cat cada)
      { name: '[Maldição Sangue] Sanguinária', type: 'Maldição', cat: 'II', spaces: 0, desc: 'Aumenta a categoria em +I. Causa sangramento cumulativo de 1d6 no alvo ao acertar (crítico deixa alvo fraco).' },
      { name: '[Maldição Sangue] Lancinante', type: 'Maldição', cat: 'II', spaces: 0, desc: 'Aumenta a categoria em +I. A arma causa +1d8 de dano de Sangue multiplicado em acertos críticos.' },
      { name: '[Maldição Morte] Erosiva', type: 'Maldição', cat: 'II', spaces: 0, desc: 'Aumenta a categoria em +I. Causa +1d8 de dano de Morte e reduz a RD do alvo em 2 a cada golpe.' },
      { name: '[Maldição Morte] Repulsiva', type: 'Maldição', cat: 'II', spaces: 0, desc: 'Aumenta a categoria em +I (Proteção). Concede +5 na Defesa contra ataques corpo a corpo.' },
      { name: '[Maldição Conhecimento] Ritualística', type: 'Maldição', cat: 'II', spaces: 0, desc: 'Aumenta a categoria em +I. Armazena um ritual na arma que é descarregado gratuitamente ao acertar um ataque.' },
      { name: '[Maldição Conhecimento] Sabedoria', type: 'Maldição', cat: 'II', spaces: 0, desc: 'Aumenta a categoria em +I (Acessório). Concede +1 em Intelecto.' },
      { name: '[Maldição Energia] Energética', type: 'Maldição', cat: 'II', spaces: 0, desc: 'Aumenta a categoria em +I. Concede +5 no ataque, converte todo dano em Energia e ignora RD.' },
      { name: '[Maldição Energia] Defesa', type: 'Maldição', cat: 'II', spaces: 0, desc: 'Aumenta a categoria em +I (Proteção). Concede +5 na Defesa e resistência 10 contra Energia.' }
    ];

    const ITEM_MODIFICATIONS_DB = [
      // Aprimoramentos de Arma (Oficiais)
      { id: 'certeira', name: 'Certeira', target: 'Arma', attackBonus: 2, desc: '+2 nos testes de ataque com a arma.' },
      { id: 'cruel', name: 'Cruel', target: 'Arma', damageBonus: 2, desc: '+2 nas rolagens de dano com a arma.' },
      { id: 'perigosa', name: 'Perigosa', target: 'Arma', threatBonus: 2, desc: '+2 na margem de ameaça (ex: 19 vira 17).' },
      { id: 'calibre_grosso', name: 'Calibre Grosso', target: 'Arma', extraDamageDie: true, desc: 'Aumenta o dano da arma de fogo em +1 dado do mesmo tipo (ex: 2d6 vira 3d6).' },
      { id: 'alongada', name: 'Alongada', target: 'Arma', attackBonus: 2, desc: '+2 nos testes de ataque com arma de fogo e aumenta alcance.' },
      { id: 'mira_laser', name: 'Mira Laser', target: 'Arma', threatBonus: 2, desc: '+2 na margem de ameaça com arma de fogo.' },
      { id: 'mira_telescopica', name: 'Mira Telescópica', target: 'Arma', desc: 'Aumenta o alcance em um passo e permite mirar para ataque furtivo em qualquer alcance.' },
      { id: 'compensador', name: 'Compensador', target: 'Arma', desc: 'Anula a penalidade de -1d20 ao fazer rajadas com armas automáticas.' },
      { id: 'silenciador', name: 'Silenciador', target: 'Arma', desc: 'Reduz em -10 a penalidade de Furtividade por disparar.' },
      { id: 'visao_calor', name: 'Visão de Calor', target: 'Arma', desc: 'Mira térmica que ignora camuflagem por escuridão, fumaça ou névoa.' },
      { id: 'tatica', name: 'Tática', target: 'Arma', desc: 'Permite sacar a arma como ação livre.' },
      { id: 'discreta', name: 'Discreta', target: 'Arma', spaceMod: -1, desc: 'Reduz os espaços ocupados em -1 e concede +5 em Crime para ocultar.' },
      { id: 'ferrolho_automatico', name: 'Ferrolho Automático', target: 'Arma', desc: 'Converte arma de disparo semi-automática em automática (permite rajada).' },
      { id: 'dum_dum', name: 'Munição Dum Dum', target: 'Munição/Explosivo', critMultBonus: 1, desc: '+1 no multiplicador de crítico (ex: x2 vira x3).' },
      { id: 'explosiva', name: 'Munição Explosiva', target: 'Munição/Explosivo', desc: 'Causa +2d6 de dano de impacto ao acertar.' },
      // Aprimoramentos de Proteção
      { id: 'reforcada', name: 'Reforçada', target: 'Proteção', defenseBonus: 2, spaceMod: 1, desc: '+2 na Defesa fornecida pela proteção (+1 espaço).' },
      { id: 'antibombas', name: 'Antibombas', target: 'Proteção', desc: '+5 em testes de resistência contra efeitos de área (apenas Proteção Pesada).' },
      { id: 'blindada', name: 'Blindada', target: 'Proteção', desc: 'Aumenta a RD da proteção em +5 contra balístico, corte, impacto e perfuração (Pesada).' },
      { id: 'discreta_prot', name: 'Discreta (Proteção)', target: 'Proteção', spaceMod: -1, desc: 'Pode ser usada sob roupas comuns sem chamar atenção (-1 espaço).' },
      // Aprimoramentos de Acessórios / Gerais
      { id: 'aprimorado', name: 'Aprimorado', target: 'Geral', desc: 'Aumenta o bônus de perícia de Utensílio ou Vestimenta de +2 para +5.' },
      { id: 'instrumental', name: 'Instrumental', target: 'Geral', desc: 'O acessório passa a funcionar também como Kit de Perícia para uma perícia escolhida.' },
      { id: 'funcao_adicional', name: 'Função Adicional', target: 'Geral', desc: 'Concede +2 em uma segunda perícia adicional.' }
    ];

    const CAT_ORDER = ['0', 'I', 'II', 'III', 'IV'];

    function computeItemEffectiveStats(item) {
      const modIds = Array.isArray(item.mods) ? item.mods : [];
      const activeMods = modIds.map(id => ITEM_MODIFICATIONS_DB.find(m => m.id === id)).filter(Boolean);

      const baseCatIdx = Math.max(0, CAT_ORDER.indexOf(item.cat || '0'));
      const effectiveCatIdx = Math.min(4, baseCatIdx + activeMods.length);
      const effectiveCat = CAT_ORDER[effectiveCatIdx];

      let attackBonus = 0;
      let damageBonus = 0;
      let threatBonus = 0;
      let critMultBonus = 0;
      let extraDamageDie = false;
      let defenseBonus = 0;
      let spaceMod = 0;

      activeMods.forEach(m => {
        if (m.attackBonus) attackBonus += m.attackBonus;
        if (m.damageBonus) damageBonus += m.damageBonus;
        if (m.threatBonus) threatBonus += m.threatBonus;
        if (m.critMultBonus) critMultBonus += m.critMultBonus;
        if (m.extraDamageDie) extraDamageDie = true;
        if (m.defenseBonus) defenseBonus += m.defenseBonus;
        if (m.spaceMod) spaceMod += m.spaceMod;
      });

      const effectiveSpaces = Math.max(0, (parseFloat(item.spaces) || 0) + spaceMod);
      const effectiveDefense = (parseInt(item.defense) || 0) + defenseBonus;

      // Apply automatic Origin/Power weapon bonuses when rendering & rolling
      let autoSkillBonus = 0;
      let autoDamageBonus = 0;
      let autoThreatBonus = 0;
      let autoExtraDie = false;

      if (item.type === 'Arma' && typeof state !== 'undefined' && state) {
        const isMelee = item.skill === 'Luta';
        const isFirearm = item.skill === 'Pontaria' && !/arco|besta|balestra/i.test(item.name);

        if (state.origin === 'Lutador' && isMelee) autoDamageBonus += 2;
        if (state.origin === 'Militar' && isFirearm) autoDamageBonus += 2;

        if (Array.isArray(state.abilities)) {
          state.abilities.forEach(ab => {
            if (ab.name === 'Golpe Pesado' && isMelee) autoExtraDie = true;
            if (ab.name === 'Balística Avançada' && isFirearm) autoDamageBonus += 2;
            if (ab.name === 'Golpe de Sorte') autoThreatBonus += 1;
          });
        }
        if (state.charClass === 'Combatente' && state.path === 'Guerreiro' && state.nex >= 10 && isMelee) {
          autoThreatBonus += 2;
        }
      }

      // Compute effective damage string (e.g., 1d8 -> +1 die if calibre grosso/golpe pesado -> 2d8, + damageBonus -> 2d8+2)
      let effectiveDamage = item.damage || '1d4';
      if (item.type === 'Arma') {
        const clean = effectiveDamage.replace(/\s+/g, '').toLowerCase();
        const match = clean.match(/^(\d+)d(\d+)([+-]\d+)?$/);
        if (match) {
          let count = parseInt(match[1]) + (extraDamageDie ? 1 : 0) + (autoExtraDie ? 1 : 0);
          const sides = parseInt(match[2]);
          const mod = (match[3] ? parseInt(match[3]) : 0) + damageBonus + autoDamageBonus;
          effectiveDamage = `${count}d${sides}${mod > 0 ? '+' + mod : mod < 0 ? mod : ''}`;
        } else if ((damageBonus + autoDamageBonus) !== 0) {
          const totalMod = damageBonus + autoDamageBonus;
          effectiveDamage = `${effectiveDamage}${totalMod > 0 ? '+' + totalMod : totalMod}`;
        }
      }

      // Compute effective crit string (e.g., 19/x2 with +2 threat -> 17/x2)
      let effectiveCrit = item.crit || '20/x2';
      let critMultiplier = 2;
      let critThreat = 20;
      if (item.type === 'Arma') {
        const critMatch = effectiveCrit.match(/^(?:(\d+)\/)?x(\d+)$/i);
        if (critMatch) {
          const baseThreat = critMatch[1] ? parseInt(critMatch[1]) : 20;
          const baseMult = parseInt(critMatch[2]);
          critThreat = Math.max(2, baseThreat - threatBonus - autoThreatBonus);
          critMultiplier = baseMult + critMultBonus + (typeof state !== 'undefined' && state?.abilities?.some(a => a.name === 'Golpe de Sorte' && a.affinity) ? 1 : 0);
          effectiveCrit = `${critThreat}/x${critMultiplier}`;
        }
      }

      return {
        activeMods,
        effectiveCat,
        effectiveSpaces,
        effectiveDefense,
        effectiveDamage,
        effectiveCrit,
        critMultiplier,
        critThreat,
        attackBonus: attackBonus + autoSkillBonus,
        damageBonus: damageBonus + autoDamageBonus
      };
    }

    function getAutoSkillPassiveBonus(skillName) {
      let bonus = 0;
      if (!state || !Array.isArray(state.abilities)) return bonus;
      state.abilities.forEach(ab => {
        if (ab.name === 'Sensitivo' && ['Diplomacia', 'Intimidação', 'Intuição'].includes(skillName)) bonus += 5;
        if (ab.name === 'Visão do Oculto' && skillName === 'Percepção') bonus += 5;
        if (ab.name === 'Identificação Paranormal' && skillName === 'Ocultismo') bonus += 10;
        if (ab.name === 'Gatuno' && ['Atletismo', 'Crime'].includes(skillName)) bonus += 5;
      });
      return bonus;
    }
    // ==================== CONTROLE DE MUNIÇÃO DE ARMAS ====================
    function weaponRequiresAmmo(item) {
      if (!item || item.type !== 'Arma') return false;
      if (item.noAmmo) return false;
      return item.skill === 'Pontaria' || /pistola|revólver|revolver|fuzil|submetralhadora|espingarda|arco|besta|balestra|bazuca|lança-chamas|metralhadora/i.test(item.name || '');
    }
    function getWeaponAmmoSupply(item) {
      if (!weaponRequiresAmmo(item)) return null;
      const weaponText = `${item.name || ''} ${item.desc || ''}`.toLowerCase();
      if (/pistola|revólver|revolver|submetralhadora|balas curtas/.test(weaponText)) {
        return { name: 'Balas Curtas', reusable: false };
      }
      if (/espingarda|cartuchos/.test(weaponText)) {
        return { name: 'Cartuchos', reusable: false };
      }
      if (/arco|besta|balestra|flechas/.test(weaponText)) {
        return { name: 'Flechas', reusable: true };
      }
      if (/fuzil|metralhadora|balas longas/.test(weaponText)) {
        return { name: 'Balas Longas', reusable: false };
      }
      return null;
    }
    function getDefaultWeaponAmmoMax(item) {
      if (typeof item.ammoMax === 'number' && item.ammoMax > 0) return item.ammoMax;
      const n = (item.name || '').toLowerCase();
      if (/revólver|revolver/.test(n)) return 6;
      if (/pistola/.test(n)) return 15;
      if (/submetralhadora/.test(n)) return 30;
      if (/fuzil de assalto/.test(n)) return 30;
      if (/fuzil de caça|fuzil de precisão/.test(n)) return 5;
      if (/espingarda/.test(n)) return 8;
      if (/metralhadora/.test(n)) return 50;
      if (/arco|besta|balestra|bazuca/.test(n)) return 1;
      return 12;
    }
    function ensureWeaponAmmoFields(item) {
      if (!weaponRequiresAmmo(item)) return null;
      const max = getDefaultWeaponAmmoMax(item);
      if (typeof item.ammoMax !== 'number' || item.ammoMax <= 0) item.ammoMax = max;
      item.ammoMax = Math.max(1, Math.floor(item.ammoMax));
      if (typeof item.ammoCurrent !== 'number' || !Number.isFinite(item.ammoCurrent)) item.ammoCurrent = item.ammoMax;
      item.ammoCurrent = Math.max(0, Math.min(item.ammoMax, Math.floor(item.ammoCurrent)));
      return { current: item.ammoCurrent, max: item.ammoMax };
    }
