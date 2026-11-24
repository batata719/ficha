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

    // ==================== MULTI-AGENT ROSTER & STATE MANAGEMENT ====================
    const ROSTER_STORAGE_KEY = 'op_agents_roster_v1';
    const LEGACY_STORAGE_KEY = 'ordem_paranormal_sheet_v3';

    function generateAgentId() {
      return 'ag_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
    }

    function getDefaultState(overrides = {}) {
      const skillsState = {};
      OFFICIAL_SKILLS.forEach(s => {
        skillsState[s.name] = { attr: s.attr, rank: 0, other: 0 };
      });

      const base = {
        id: generateAgentId(),
        updatedAt: Date.now(),
        name: 'Novo Agente',
        player: '',
        origin: 'Personalizada',
        charClass: 'Combatente',
        path: 'Aniquilador',
        rank: 'Recruta',
        nex: 5,
        pp: 0,
        affinity: 'Nenhuma',
        attributes: { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 },
        combatenteAttackSkill: 'Luta',
        combatenteDefenseSkill: 'Fortitude',
        peritoSkills: [],
        currentPv: 21,
        currentPe: 3,
        currentSan: 12,
        bonusPv: 0,
        bonusPe: 0,
        bonusSan: 0,
        speed: 9,
        defenseOther: 0,
        rd: '',
        proficiencies: 'Armas Simples, Armas Táticas, Proteções Leves',
        notes: '',
        clues: '',
        skills: skillsState,
        abilities: [],
        rituals: [],
        inventory: [
          {
            id: 101,
            name: 'Faca',
            type: 'Arma',
            cat: '0',
            spaces: 1,
            skill: 'Luta',
            damage: '1d4',
            crit: '19/x2',
            equipped: true,
            desc: 'Arma simples leve, ágil, arremesso (curto). Corte.'
          }
        ]
      };

      return { ...base, ...overrides };
    }

    function createPresetObject(presetType) {
      if (presetType === 'combatente') {
        const ag = getDefaultState({
          name: 'Kaelen Vance',
          player: 'Agente',
          origin: 'Militar',
          charClass: 'Combatente',
          path: 'Tropa de Choque',
          rank: 'Operador',
          nex: 15,
          pp: 25,
          attributes: { AGI: 2, FOR: 3, INT: 1, PRE: 1, VIG: 2 },
          combatenteAttackSkill: 'Luta',
          combatenteDefenseSkill: 'Fortitude',
          currentPv: 39,
          currentPe: 9,
          currentSan: 18,
          inventory: [
            { id: 1, name: 'Fuzil de Assalto', type: 'Arma', cat: 'II', spaces: 2, skill: 'Pontaria', damage: '2d10', crit: '19/x3', equipped: true, desc: 'Arma tática duas mãos, automática, alcance médio.' },
            { id: 2, name: 'Machado', type: 'Arma', cat: 'I', spaces: 1, skill: 'Luta', damage: '1d8', crit: 'x3', equipped: true, desc: 'Arma tática uma mão. Corte.' },
            { id: 3, name: 'Proteção Leve', type: 'Proteção', cat: 'I', spaces: 2, defense: 5, equipped: true, desc: 'Colete de kevlar leve (+5 Defesa).' },
            { id: 4, name: 'Balas Longas (Pacote)', type: 'Munição/Explosivo', cat: 'I', spaces: 1, desc: 'Munição para fuzil.' }
          ],
          abilities: [
            { id: 11, name: 'Golpe Pesado', source: 'Poder de Combatente', cost: 'Passivo', element: 'Nenhum', affinity: false, desc: 'O dano de suas armas corpo a corpo aumenta em mais um dado do mesmo tipo.' }
          ]
        });
        ag.skills['Pontaria'].rank = 5;
        ag.skills['Tática'].rank = 5;
        ag.skills['Luta'].rank = 5;
        ag.skills['Fortitude'].rank = 5;
        ag.skills['Iniciativa'].rank = 5;
        ag.skills['Atletismo'].rank = 5;
        return ag;
      }

      if (presetType === 'especialista') {
        const ag = getDefaultState({
          name: 'Helena Duarte',
          player: 'Agente',
          origin: 'Investigador',
          charClass: 'Especialista',
          path: 'Atirador de Elite',
          rank: 'Operador',
          nex: 20,
          pp: 30,
          attributes: { AGI: 3, FOR: 1, INT: 3, PRE: 2, VIG: 1 },
          peritoSkills: ['Investigação', 'Pontaria'],
          proficiencies: 'Armas Simples, Armas de Fogo (Balas Longas), Proteções Leves',
          currentPv: 28,
          currentPe: 20,
          currentSan: 28,
          inventory: [
            { id: 1, name: 'Fuzil de Caça', type: 'Arma', cat: 'I', spaces: 2, skill: 'Pontaria', damage: '2d8', crit: '19/x3', equipped: true, desc: 'Soma Intelecto no dano (Mira de Elite).' },
            { id: 2, name: 'Pistola', type: 'Arma', cat: 'I', spaces: 1, skill: 'Pontaria', damage: '1d12', crit: '18/x2', equipped: true, desc: 'Arma simples leve, alcance curto.' },
            { id: 3, name: 'Proteção Leve', type: 'Proteção', cat: 'I', spaces: 2, defense: 5, equipped: true, desc: 'Jaqueta reforçada (+5 Defesa).' },
            { id: 4, name: 'Utensílio (+2 Perícia)', type: 'Geral', cat: 'I', spaces: 1, desc: 'Kit forense (+2 em Investigação).' }
          ],
          abilities: [
            { id: 21, name: 'Balística Avançada', source: 'Poder de Especialista', cost: 'Passivo', element: 'Nenhum', affinity: false, desc: 'Proficiência com armas táticas de fogo e +2 em rolagens de dano com armas de fogo.' }
          ]
        });
        ['Investigação', 'Percepção', 'Pontaria', 'Furtividade', 'Reflexos', 'Tecnologia', 'Medicina', 'Intuição', 'Crime', 'Acrobacia', 'Tática', 'Atualidades'].forEach(s => {
          ag.skills[s].rank = 5;
        });
        return ag;
      }

      // Default Ocultista Conduíte Desgarrado
      const ag = getDefaultState({
        name: 'Veríssimo Viana',
        player: 'Agente',
        origin: 'Desgarrado',
        charClass: 'Ocultista',
        path: 'Conduíte',
        rank: 'Operador',
        nex: 25,
        pp: 35,
        affinity: 'Morte',
        attributes: { AGI: 1, FOR: 1, INT: 3, PRE: 3, VIG: 2 },
        proficiencies: 'Armas Simples',
        currentPv: 35,
        currentPe: 35,
        currentSan: 40,
        inventory: [
          { id: 1, name: 'Punhal', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d4', crit: 'x3', equipped: true, desc: 'Punhal ritualístico gravado.' },
          { id: 2, name: 'Componentes Ritualísticos (Morte)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Cinzas e ossos para rituais de Morte.' },
          { id: 3, name: 'Componentes Ritualísticos (Energia)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Cristais e baterias para rituais de Energia.' },
          { id: 4, name: 'Vestimenta (+2 Perícia)', type: 'Geral', cat: 'I', spaces: 1, desc: 'Sobretudo ocultista (+2 Ocultismo).' }
        ],
        abilities: [
          { id: 31, name: 'Ritual Potente', source: 'Poder de Ocultista', cost: 'Passivo', element: 'Nenhum', affinity: false, desc: 'Você soma seu Intelecto nas rolagens de dano ou nos efeitos de cura de seus rituais.' }
        ],
        rituals: [
          { id: 101, name: 'Decadência', element: 'Morte', circle: '1', cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Fortitude reduz à metade', desc: 'Espirais de trevas envolvem sua mão e definham o alvo, que sofre 2d8+2 pontos de dano de Morte.', discente: '(+2 PE) muda a resistência para nenhuma e o dano para 3d8+3 com ataque corpo a corpo.', verdadeira: '(+5 PE) explosão de 6m causando 8d8+8. Requer 3º círculo.' },
          { id: 102, name: 'Cicatrização', element: 'Morte', circle: '1', cast: 'Padrão', range: 'Toque', target: '1 ser', duration: 'Instantânea', resist: 'Nenhuma', desc: 'Acelera o tempo ao redor das feridas do alvo, recuperando 3d8+3 PV (envelhece 1 ano).', discente: '(+2 PE) aumenta a cura para 5d8+5 PV.', verdadeira: '(+9 PE) cura 7d8+7 PV em seres escolhidos em alcance curto.' },
          { id: 103, name: 'Tela de Ruído', element: 'Energia', circle: '2', cast: 'Padrão ou Reação', range: 'Pessoal', target: 'Você', duration: 'Cena ou instantânea', resist: 'Nenhuma', desc: 'Concede 30 PV temporários contra dano físico ou reduz dano sofrido em 15 como reação.', discente: '(+3 PE) aumenta para 60 PV temporários ou redução de 30.', verdadeira: '(+7 PE) cria esfera impenetrável com 100 PV.' }
        ]
      });
      ['Fortitude', 'Sobrevivência', 'Ocultismo', 'Vontade', 'Investigação', 'Percepção', 'Iniciativa', 'Intuição'].forEach(s => {
        ag.skills[s].rank = 5;
      });
      return ag;
    }

    let rosterData = loadRoster();
    let state = getActiveAgentState();

    function loadRoster() {
      try {
        const rawRoster = localStorage.getItem(ROSTER_STORAGE_KEY);
        if (rawRoster) {
          const parsed = JSON.parse(rawRoster);
          if (parsed && Array.isArray(parsed.agents) && parsed.agents.length > 0) {
            return parsed;
          }
        }

        // Migrate legacy single sheet if present
        const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY) || localStorage.getItem('ordem_paranormal_sheet_v2');
        if (legacyRaw) {
          const legacyAgent = getDefaultState(JSON.parse(legacyRaw));
          if (!legacyAgent.name) legacyAgent.name = 'Agente Migrado';
          const initialRoster = { activeId: legacyAgent.id, view: 'hub', agents: [legacyAgent] };
          localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(initialRoster));
          return initialRoster;
        }
      } catch (e) {
        console.error('Erro ao carregar arquivo de agentes:', e);
      }

      // First run: populate with 2 rich sample agents
      const sample1 = createPresetObject('ocultista');
      const sample2 = createPresetObject('combatente');
      const freshRoster = {
        activeId: sample1.id,
        view: 'hub',
        agents: [sample1, sample2]
      };
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(freshRoster));
      return freshRoster;
    }

    function getActiveAgentState() {
      const found = rosterData.agents.find(a => a.id === rosterData.activeId);
      if (found) return { ...getDefaultState(), ...found };
      if (rosterData.agents.length > 0) {
        rosterData.activeId = rosterData.agents[0].id;
        return { ...getDefaultState(), ...rosterData.agents[0] };
      }
      const fallback = getDefaultState();
      rosterData.agents = [fallback];
      rosterData.activeId = fallback.id;
      return fallback;
    }

    function saveState() {
      try {
        state.updatedAt = Date.now();
        const idx = rosterData.agents.findIndex(a => a.id === state.id);
        if (idx >= 0) {
          rosterData.agents[idx] = state;
        } else {
          rosterData.agents.push(state);
          rosterData.activeId = state.id;
        }
        localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));

        const ind = document.getElementById('save-indicator');
        ind.textContent = '• Salvo agora';
        setTimeout(() => { ind.textContent = '• Salvo localmente'; }, 1500);
      } catch (e) {
        console.error('Erro ao salvar ficha:', e);
      }
    }

    // ==================== VIEW NAVIGATION (HUB <-> SHEET) ====================
    function openHubScreen() {
      saveState();
      rosterData.view = 'hub';
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
      applyViewVisibility();
      renderHub();
    }

    function openAgentSheet(agentId) {
      const target = rosterData.agents.find(a => a.id === agentId);
      if (!target) return;
      rosterData.activeId = agentId;
      rosterData.view = 'sheet';
      state = getActiveAgentState();
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
      applyViewVisibility();
      refreshAll();
    }

    function switchActiveAgent(agentId) {
      saveState();
      openAgentSheet(agentId);
      showToast('Agente Alternado', `Ficha ativa: ${state.name || 'Sem Nome'} (NEX ${state.nex}%)`, '⇄');
    }

    function applyViewVisibility() {
      const isHub = rosterData.view === 'hub';
      document.getElementById('hub-view').classList.toggle('hidden', !isHub);
      document.getElementById('sheet-view').classList.toggle('hidden', isHub);
      document.getElementById('sheet-view').classList.toggle('flex', !isHub);

      document.getElementById('btn-back-hub').classList.toggle('hidden', isHub);
      document.getElementById('quick-agent-switcher-wrap').classList.toggle('hidden', isHub);
      document.getElementById('quick-agent-switcher-wrap').classList.toggle('flex', !isHub);
      document.getElementById('btn-export-single').classList.toggle('hidden', isHub);
      document.getElementById('btn-reset-single').classList.toggle('hidden', isHub);

      if (isHub) {
        document.documentElement.style.setProperty('--accent', '#a855f7');
        document.documentElement.style.setProperty('--accent-soft', 'rgba(168, 85, 247, 0.14)');
        document.documentElement.style.setProperty('--accent-border', 'rgba(168, 85, 247, 0.42)');
      }
    }

    function computeAgentSnapshotStats(agentObj) {
      const prevState = state;
      state = { ...getDefaultState(), ...agentObj };
      const stats = calculateMaxStats();
      state = prevState;
      return stats;
    }

    function renderHub() {
      const search = (document.getElementById('hub-search').value || '').toLowerCase();
      const classFilter = document.getElementById('hub-filter-class').value;
      const affinityFilter = document.getElementById('hub-filter-affinity').value;

      const totalAgents = rosterData.agents.length;
      const avgNex = totalAgents
        ? Math.round(rosterData.agents.reduce((acc, a) => acc + (a.nex || 5), 0) / totalAgents)
        : 5;
      const affinityCount = rosterData.agents.filter(a => a.affinity && a.affinity !== 'Nenhuma').length;

      document.getElementById('hub-stat-total').textContent = totalAgents;
      document.getElementById('hub-stat-nex').textContent = `${avgNex}%`;
      document.getElementById('hub-stat-affinity').textContent = affinityCount;

      const filtered = rosterData.agents.filter(ag => {
        const matchSearch = (ag.name || '').toLowerCase().includes(search) ||
          (ag.player || '').toLowerCase().includes(search) ||
          (ag.origin || '').toLowerCase().includes(search) ||
          (ag.path || '').toLowerCase().includes(search);
        const matchClass = classFilter === 'Todas' || ag.charClass === classFilter;
        const matchAffinity = affinityFilter === 'Todas' || (ag.affinity || 'Nenhuma') === affinityFilter;
        return matchSearch && matchClass && matchAffinity;
      });

      const grid = document.getElementById('hub-agents-grid');

      const newCardHtml = `
        <button onclick="openNewAgentModal()"
          class="min-h-[245px] bg-surface/50 hover:bg-surface border-2 border-dashed border-borderSubtle hover:border-purple-500/60 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition group">
          <div class="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-2xl text-purple-400 group-hover:scale-110 transition">
            +
          </div>
          <div>
            <h3 class="text-sm font-semibold text-white">Cadastrar Novo Agente</h3>
            <p class="text-xs text-zinc-400 mt-1">Ficha limpa ou modelo pronto de combate, investigação ou ocultismo</p>
          </div>
        </button>
      `;

      const agentCardsHtml = filtered.map(ag => {
        const theme = ELEMENT_THEMES[ag.affinity] || ELEMENT_THEMES['Nenhuma'];
        const snap = computeAgentSnapshotStats(ag);
        const initials = (ag.name || 'AG')
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map(w => w[0]?.toUpperCase() || '')
          .join('') || 'AG';

        const pvPct = Math.min(100, Math.max(0, Math.round(((ag.currentPv ?? snap.maxPv) / snap.maxPv) * 100)));
        const pePct = Math.min(100, Math.max(0, Math.round(((ag.currentPe ?? snap.maxPe) / snap.maxPe) * 100)));
        const sanPct = Math.min(100, Math.max(0, Math.round(((ag.currentSan ?? snap.maxSan) / snap.maxSan) * 100)));

        const updatedDate = ag.updatedAt
          ? new Date(ag.updatedAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
          : 'Recente';

        return `
          <div class="bg-surface border border-borderSubtle hover:border-zinc-600 rounded-2xl p-5 flex flex-col justify-between gap-4 transition shadow-lg">
            <div class="space-y-3">
              <!-- Card Top: Avatar + Identity + NEX -->
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 border"
                    style="background:${theme.soft}; border-color:${theme.border}; color:${theme.accent}">
                    ${initials}
                  </div>
                  <div class="min-w-0">
                    <h3 class="font-bold text-base text-white truncate">${ag.name || 'Agente Sem Nome'}</h3>
                    <p class="text-xs text-zinc-400 truncate">${ag.charClass} • ${ag.path}</p>
                  </div>
                </div>
                <div class="text-right shrink-0">
                  <span class="inline-block font-mono text-xs font-bold px-2.5 py-1 rounded-lg border"
                    style="background:${theme.soft}; border-color:${theme.border}; color:${theme.accent}">
                    NEX ${ag.nex}%
                  </span>
                </div>
              </div>

              <!-- Meta Tags -->
              <div class="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                <span class="px-2 py-0.5 rounded bg-void border border-borderSubtle text-zinc-300">${ag.origin}</span>
                <span class="px-2 py-0.5 rounded bg-void border border-borderSubtle text-zinc-400">${ag.rank}</span>
                ${ag.affinity && ag.affinity !== 'Nenhuma'
                  ? `<span class="px-2 py-0.5 rounded bg-void border border-borderSubtle" style="color:${theme.accent}">★ ${ag.affinity}</span>`
                  : ''}
              </div>

              <!-- Compact Vital Bars -->
              <div class="bg-void border border-borderSubtle/80 rounded-xl p-2.5 space-y-2 text-[11px] font-mono">
                <div>
                  <div class="flex justify-between text-zinc-400 mb-0.5">
                    <span class="text-rose-400 font-semibold">PV</span>
                    <span>${ag.currentPv ?? snap.maxPv}/${snap.maxPv}</span>
                  </div>
                  <div class="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                    <div class="h-full bg-rose-500" style="width:${pvPct}%"></div>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-2.5">
                  <div>
                    <div class="flex justify-between text-zinc-400 mb-0.5">
                      <span class="text-amber-300 font-semibold">PE</span>
                      <span>${ag.currentPe ?? snap.maxPe}/${snap.maxPe}</span>
                    </div>
                    <div class="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                      <div class="h-full bg-amber-400" style="width:${pePct}%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-zinc-400 mb-0.5">
                      <span class="text-sky-300 font-semibold">SAN</span>
                      <span>${ag.currentSan ?? snap.maxSan}/${snap.maxSan}</span>
                    </div>
                    <div class="w-full h-1.5 bg-surface rounded-full overflow-hidden">
                      <div class="h-full bg-sky-400" style="width:${sanPct}%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="space-y-2.5 pt-1 border-t border-borderSubtle/60">
              <div class="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>Jogador: ${ag.player || '—'}</span>
                <span>Editado: ${updatedDate}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <button onclick="openAgentSheet('${ag.id}')"
                  class="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition hover:brightness-110"
                  style="background:${theme.accent}">
                  Abrir Ficha →
                </button>
                <button onclick="duplicateAgent('${ag.id}')" title="Duplicar Agente (Backup de NEX)"
                  class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs text-zinc-300 transition">
                  📋
                </button>
                <button onclick="exportSingleAgentById('${ag.id}')" title="Exportar JSON desta ficha"
                  class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs text-zinc-300 transition">
                  💾
                </button>
                <button onclick="deleteAgent('${ag.id}')" title="Excluir Ficha"
                  class="px-2.5 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-900/40 text-xs text-red-300 transition">
                  🗑
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      grid.innerHTML = newCardHtml + agentCardsHtml;
    }

    function openNewAgentModal() {
      document.getElementById('new-agent-name').value = '';
      document.getElementById('new-agent-player').value = '';
      document.getElementById('new-agent-origin').innerHTML = ORIGINS_DB.map(o => `<option value="${o.name}">${o.name}</option>`).join('');
      openModal('modal-new-agent');
    }

    function createCustomAgent() {
      const name = document.getElementById('new-agent-name').value.trim() || 'Novo Agente';
      const player = document.getElementById('new-agent-player').value.trim();
      const origin = document.getElementById('new-agent-origin').value;
      const charClass = document.getElementById('new-agent-class').value;
      const defaultPath = Object.keys(CLASSES_DB[charClass].paths)[0];

      const newAgent = getDefaultState({
        name,
        player,
        origin,
        charClass,
        path: defaultPath
      });

      // Apply automatic origin & class skill trainings + initial stats
      const prevState = state;
      state = newAgent;
      enforceMandatorySkills();
      const maxStats = calculateMaxStats();
      state.currentPv = maxStats.maxPv;
      state.currentPe = maxStats.maxPe;
      state.currentSan = maxStats.maxSan;
      state = prevState;

      rosterData.agents.unshift(newAgent);
      closeModal('modal-new-agent');
      openAgentSheet(newAgent.id);
      showToast('Agente Recrutado', `${name} (${charClass} • ${origin}) criado com treinamentos aplicados!`, 'NEX 5%');
    }

    function createPresetAgent(presetType) {
      const presetAgent = createPresetObject(presetType);
      presetAgent.id = generateAgentId();
      presetAgent.updatedAt = Date.now();
      rosterData.agents.unshift(presetAgent);
      closeModal('modal-new-agent');
      openAgentSheet(presetAgent.id);
      showToast('Modelo Carregado', `${presetAgent.name} pronto para operação!`, `NEX ${presetAgent.nex}%`);
    }

    function duplicateAgent(agentId) {
      const original = rosterData.agents.find(a => a.id === agentId);
      if (!original) return;
      const copy = JSON.parse(JSON.stringify(original));
      copy.id = generateAgentId();
      copy.name = `${original.name || 'Agente'} (Cópia)`;
      copy.updatedAt = Date.now();
      rosterData.agents.unshift(copy);
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
      renderHub();
      showToast('Ficha Duplicada', `Cópia "${copy.name}" criada com sucesso.`, '📋');
    }

    let pendingDeleteId = null;
    function deleteAgent(agentId) {
      const target = rosterData.agents.find(a => a.id === agentId);
      if (!target) return;

      if (pendingDeleteId !== agentId) {
        pendingDeleteId = agentId;
        showToast('Confirmar Exclusão?', `Clique novamente na lixeira de "${target.name}" em 4s para apagar.`, '!');
        setTimeout(() => { if (pendingDeleteId === agentId) pendingDeleteId = null; }, 4000);
        return;
      }

      pendingDeleteId = null;
      rosterData.agents = rosterData.agents.filter(a => a.id !== agentId);
      if (rosterData.agents.length === 0) {
        const fallback = getDefaultState({ name: 'Agente Recruta' });
        rosterData.agents.push(fallback);
      }
      if (rosterData.activeId === agentId) {
        rosterData.activeId = rosterData.agents[0].id;
        state = getActiveAgentState();
      }
      localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
      renderHub();
      showToast('Ficha Excluída', `O registro de "${target.name}" foi removido do arquivo.`, '🗑');
    }

    // ==================== AUTOMATIC SKILL TRAINING ENGINE ====================
    function getMandatorySkills() {
      const originObj = ORIGINS_DB.find(o => o.name === state.origin);
      const originSkills = originObj ? [...originObj.skills] : [];
      const classSkills = [];

      if (state.charClass === 'Combatente') {
        if (state.combatenteAttackSkill) classSkills.push(state.combatenteAttackSkill);
        if (state.combatenteDefenseSkill) classSkills.push(state.combatenteDefenseSkill);
      } else if (state.charClass === 'Ocultista') {
        classSkills.push('Ocultismo', 'Vontade');
      }

      const uniqueMandatory = Array.from(new Set([...originSkills, ...classSkills]));
      return {
        originSkills,
        classSkills,
        uniqueMandatory
      };
    }

    function getSkillQuotaSummary() {
      const intVal = state.attributes.INT;
      const mandatory = getMandatorySkills();

      // Base class free trained skills (excluding mandatory ones)
      let classFreeBase = 1; // Combatente: 1 + INT
      let upgradePerMilestone = 2; // Combatente: 2 + INT at 35% and 70%

      if (state.charClass === 'Especialista') {
        classFreeBase = 7; // Especialista: 7 + INT
        upgradePerMilestone = 5; // Especialista: 5 + INT
      } else if (state.charClass === 'Ocultista') {
        classFreeBase = 3; // Ocultista: 3 + INT
        upgradePerMilestone = 3; // Ocultista: 3 + INT
      }

      // Origin extra free skill slots (Personalizada = 2, Amnésico = 2)
      const originFreeBase = (state.origin === 'Personalizada' || state.origin === 'Amnésico') ? 2 : 0;

      // Total allowed trained skills (rank >= 5)
      const freeTrainedAllowed = Math.max(0, classFreeBase + intVal + originFreeBase);
      const totalTrainedAllowed = mandatory.uniqueMandatory.length + freeTrainedAllowed;

      // Count actual trained, veteran, expert
      let actualTrained = 0;
      let actualVeteranOrHigher = 0;
      let actualExpert = 0;

      OFFICIAL_SKILLS.forEach(s => {
        const r = state.skills[s.name]?.rank || 0;
        if (r >= 5) actualTrained++;
        if (r >= 10) actualVeteranOrHigher++;
        if (r >= 15) actualExpert++;
      });

      const veteranSlotsAllowed = state.nex >= 35 ? Math.max(0, upgradePerMilestone + intVal) : 0;
      const expertSlotsAllowed = state.nex >= 70 ? Math.max(0, upgradePerMilestone + intVal) : 0;

      return {
        mandatory,
        freeTrainedAllowed,
        totalTrainedAllowed,
        actualTrained,
        veteranSlotsAllowed,
        actualVeteranOrHigher,
        expertSlotsAllowed,
        actualExpert
      };
    }

    function enforceMandatorySkills() {
      const { uniqueMandatory } = getMandatorySkills();
      uniqueMandatory.forEach(skillName => {
        if (state.skills[skillName] && state.skills[skillName].rank < 5) {
          state.skills[skillName].rank = 5;
        }
      });
    }

    function setCombatenteChoice(slotType, skillName) {
      const prevSkill = slotType === 'attack' ? state.combatenteAttackSkill : state.combatenteDefenseSkill;
      if (prevSkill === skillName) return;

      // Reset previous mandatory skill to 0 only if it wasn't also granted by Origin
      const originObj = ORIGINS_DB.find(o => o.name === state.origin);
      const originSkills = originObj ? originObj.skills : [];
      if (prevSkill && !originSkills.includes(prevSkill) && state.skills[prevSkill]?.rank === 5) {
        state.skills[prevSkill].rank = 0;
      }

      if (slotType === 'attack') state.combatenteAttackSkill = skillName;
      if (slotType === 'defense') state.combatenteDefenseSkill = skillName;

      enforceMandatorySkills();
      saveState();
      refreshAll();
    }

    function togglePeritoSkill(skillName) {
      if (!Array.isArray(state.peritoSkills)) state.peritoSkills = [];
      const idx = state.peritoSkills.indexOf(skillName);
      if (idx >= 0) {
        state.peritoSkills.splice(idx, 1);
      } else {
        if (state.peritoSkills.length >= 2) {
          state.peritoSkills.shift();
        }
        state.peritoSkills.push(skillName);
      }
      saveState();
      refreshAll();
    }

    function getPeritoDie() {
      if (state.nex >= 85) return '1d12';
      if (state.nex >= 55) return '1d10';
      if (state.nex >= 25) return '1d8';
      return '1d6';
    }

    // ==================== CORE CALCULATIONS ====================
    function getNexLevelIndex(nex) {
      const idx = NEX_STEPS.indexOf(nex);
      return idx >= 0 ? idx + 1 : 1;
    }

    function getAttributePointsBudget(nex) {
      let bonus = 0;
      if (nex >= 20) bonus++;
      if (nex >= 50) bonus++;
      if (nex >= 80) bonus++;
      if (nex >= 95) bonus++;
      return {
        totalSumAllowed: 9 + bonus,
        maxPerAttr: nex >= 20 ? 5 : 3
      };
    }

    function calculateMaxStats() {
      const level = getNexLevelIndex(state.nex);
      const vig = state.attributes.VIG;
      const pre = state.attributes.PRE;
      const agi = state.attributes.AGI;
      const int = state.attributes.INT;
      const forca = state.attributes.FOR;

      let basePv = 20, perLevelPv = 4;
      let basePe = 2, perLevelPe = 2;
      let baseSan = 12, perLevelSan = 3;

      if (state.charClass === 'Especialista') {
        basePv = 16; perLevelPv = 3;
        basePe = 3; perLevelPe = 3;
        baseSan = 16; perLevelSan = 4;
      } else if (state.charClass === 'Ocultista') {
        basePv = 12; perLevelPv = 2;
        basePe = 4; perLevelPe = 4;
        baseSan = 20; perLevelSan = 5;
      }

      // Origin automatic passive bonuses
      let originPvBonus = state.origin === 'Desgarrado' ? level : 0;
      let originSanBonus = state.origin === 'Vítima' ? level : 0;
      let originPeBonus = state.origin === 'Universitário' ? (1 + Math.floor(level / 2)) : 0;
      let originPeLimitBonus = state.origin === 'Universitário' ? 1 : 0;
      let originDefBonus = state.origin === 'Policial' ? 2 : 0;

      // Paranormal Powers passive bonuses
      let powerPvBonus = 0;
      let powerPeBonus = 0;
      let powerDefBonus = 0;
      state.abilities.forEach(ab => {
        if (ab.name === 'Sangue de Ferro') powerPvBonus += (level * 2);
        if (ab.name === 'Potencial Aprimorado') powerPeBonus += (level * (ab.affinity ? 2 : 1));
        if (ab.name === 'Precognição') powerDefBonus += 2;
        if (ab.name === 'Reflexos Defensivos') powerDefBonus += 2;
      });

      let maxPv = basePv + vig + ((level - 1) * (perLevelPv + vig)) + originPvBonus + powerPvBonus + (state.bonusPv || 0);
      let maxPe = basePe + pre + ((level - 1) * (perLevelPe + pre)) + originPeBonus + powerPeBonus + (state.bonusPe || 0);
      let maxSan = baseSan + ((level - 1) * perLevelSan) + originSanBonus + (state.bonusSan || 0);
      if (state.origin === 'Cultista Arrependido') maxSan = Math.floor(maxSan / 2);

      const peLimit = level + originPeLimitBonus;

      // Armor defense & heavy armor penalty
      let armorDefense = 0;
      let heavyArmorEquipped = false;
      let backpackBonus = 0;

      state.inventory.forEach(item => {
        const eff = computeItemEffectiveStats(item);
        if (item.type === 'Proteção' && item.equipped) {
          armorDefense += eff.effectiveDefense;
          if (item.name.toLowerCase().includes('pesada')) heavyArmorEquipped = true;
        }
        if (item.name.toLowerCase().includes('mochila militar')) {
          backpackBonus += 2;
        }
      });

      // Load calculation
      const isTecnico = state.charClass === 'Especialista' && state.path === 'Técnico' && state.nex >= 10;
      const loadAttr = forca + (isTecnico ? int : 0);
      const maxSpaces = Math.max(2, loadAttr * 5) + backpackBonus;
      const currentSpaces = state.inventory.reduce((acc, it) => acc + computeItemEffectiveStats(it).effectiveSpaces, 0);
      const isOverloaded = currentSpaces > maxSpaces;

      const defense = 10 + agi + armorDefense + originDefBonus + powerDefBonus + (state.defenseOther || 0) - (isOverloaded ? 5 : 0);
      const reflexBonus = (state.skills['Reflexos']?.rank || 0) + (state.skills['Reflexos']?.other || 0);
      const fortitudeBonus = (state.skills['Fortitude']?.rank || 0) + (state.skills['Fortitude']?.other || 0);

      const dodge = defense + reflexBonus;
      const blockRd = fortitudeBonus + (state.charClass === 'Combatente' && state.path === 'Tropa de Choque' && state.nex >= 10 ? vig : 0);
      const ritualDt = 10 + peLimit + pre;

      return {
        level,
        maxPv: Math.max(1, maxPv),
        maxPe: Math.max(1, maxPe),
        maxSan: Math.max(1, maxSan),
        peLimit,
        armorDefense,
        heavyArmorEquipped,
        defense,
        dodge,
        blockRd,
        ritualDt,
        maxSpaces,
        currentSpaces,
        isOverloaded
      };
    }

    // ==================== SELECTION HANDLERS ====================
    function selectOrigin(originName) {
      const prevOriginObj = ORIGINS_DB.find(o => o.name === state.origin);
      const prevOriginSkills = prevOriginObj ? prevOriginObj.skills : [];

      state.origin = originName;
      const newOriginObj = ORIGINS_DB.find(o => o.name === originName);
      const newOriginSkills = newOriginObj ? newOriginObj.skills : [];
      const classMandatory = getMandatorySkills().classSkills;

      // Cleanly remove previous origin's exclusive rank-5 grants
      prevOriginSkills.forEach(s => {
        if (!newOriginSkills.includes(s) && !classMandatory.includes(s) && state.skills[s]?.rank === 5) {
          state.skills[s].rank = 0;
        }
      });

      enforceMandatorySkills();

      if (newOriginObj && newOriginObj.skills.length > 0) {
        showToast(`Origem: ${originName}`, `Perícias ${newOriginObj.skills.join(' e ')} treinadas automaticamente!`, '+5');
      } else {
        showToast(`Origem: ${originName}`, `Você possui +2 perícias livres à escolha para treinar.`, 'Livre');
      }
      saveState();
      refreshAll();
    }

    function selectClass(className) {
      const prevMax = calculateMaxStats();
      const prevClassMandatory = getMandatorySkills().classSkills;
      const originSkills = getMandatorySkills().originSkills;

      state.charClass = className;
      const availablePaths = Object.keys(CLASSES_DB[className].paths);
      if (!availablePaths.includes(state.path)) {
        state.path = availablePaths[0];
      }

      const newClassMandatory = getMandatorySkills().classSkills;

      // Cleanly remove previous class's exclusive rank-5 grants
      prevClassMandatory.forEach(s => {
        if (!newClassMandatory.includes(s) && !originSkills.includes(s) && state.skills[s]?.rank === 5) {
          state.skills[s].rank = 0;
        }
      });

      enforceMandatorySkills();

      const newMax = calculateMaxStats();
      if (state.currentPv >= prevMax.maxPv) state.currentPv = newMax.maxPv;
      if (state.currentPe >= prevMax.maxPe) state.currentPe = newMax.maxPe;
      if (state.currentSan >= prevMax.maxSan) state.currentSan = newMax.maxSan;

      // Update default proficiencies hint if still default
      if (className === 'Combatente') state.proficiencies = 'Armas Simples, Armas Táticas, Proteções Leves';
      if (className === 'Especialista') state.proficiencies = 'Armas Simples, Proteções Leves';
      if (className === 'Ocultista') state.proficiencies = 'Armas Simples';

      saveState();
      refreshAll();
    }

    function updatePP(ppValue) {
      state.pp = Math.max(0, ppValue);
      // Automatic Patente progression by PP
      let newRank = 'Recruta';
      if (state.pp >= 200) newRank = 'Agente de Elite';
      else if (state.pp >= 100) newRank = 'Oficial de Operações';
      else if (state.pp >= 50) newRank = 'Agente Especial';
      else if (state.pp >= 20) newRank = 'Operador';

      if (newRank !== state.rank) {
        state.rank = newRank;
        showToast('Promoção de Patente!', `Com ${state.pp} PP, sua patente agora é ${newRank}.`, '★');
      }
      saveState();
      refreshAll();
    }

    function applyTheme() {
  const currentSiteTheme = document.documentElement.getAttribute('data-theme');
  if (currentSiteTheme === 'coquette') {
    document.documentElement.style.setProperty('--accent', '#ec4899');
    document.documentElement.style.setProperty('--accent-soft', 'rgba(236, 72, 153, 0.14)');
    document.documentElement.style.setProperty('--accent-border', 'rgba(236, 72, 153, 0.45)');
    return;
  }

  const theme = ELEMENT_THEMES[state.affinity] || ELEMENT_THEMES['Nenhuma'];
  document.documentElement.style.setProperty('--accent', theme.accent);
  document.documentElement.style.setProperty('--accent-soft', theme.soft);
  document.documentElement.style.setProperty('--accent-border', theme.border);
}

    function updateField(key, value) {
      const prevMax = calculateMaxStats();
      state[key] = value;

      const newMax = calculateMaxStats();
      if (['nex', 'charClass', 'origin', 'bonusPv', 'bonusPe', 'bonusSan'].includes(key)) {
        if (state.currentPv >= prevMax.maxPv) state.currentPv = newMax.maxPv;
        if (state.currentPe >= prevMax.maxPe) state.currentPe = newMax.maxPe;
        if (state.currentSan >= prevMax.maxSan) state.currentSan = newMax.maxSan;
      }

      saveState();
      refreshAll();
    }

    function adjustAttribute(attrKey, delta) {
      const currentVal = state.attributes[attrKey];
      const newVal = currentVal + delta;
      const budget = getAttributePointsBudget(state.nex);

      if (newVal < 0 || newVal > budget.maxPerAttr) return;

      const prevMax = calculateMaxStats();
      state.attributes[attrKey] = newVal;
      const nextMax = calculateMaxStats();

      if (attrKey === 'VIG') state.currentPv = Math.max(1, state.currentPv + (nextMax.maxPv - prevMax.maxPv));
      if (attrKey === 'PRE') state.currentPe = Math.max(0, state.currentPe + (nextMax.maxPe - prevMax.maxPe));

      saveState();
      refreshAll();
    }

    function adjustStat(stat, delta) {
      const stats = calculateMaxStats();
      if (stat === 'pv') state.currentPv = Math.max(0, Math.min(stats.maxPv + 100, state.currentPv + delta));
      if (stat === 'pe') state.currentPe = Math.max(0, Math.min(stats.maxPe + 50, state.currentPe + delta));
      if (stat === 'san') state.currentSan = Math.max(0, Math.min(stats.maxSan + 50, state.currentSan + delta));
      saveState();
      refreshAll();
    }

    function setStat(stat, val) {
      const num = parseInt(val) || 0;
      if (stat === 'pv') state.currentPv = Math.max(0, num);
      if (stat === 'pe') state.currentPe = Math.max(0, num);
      if (stat === 'san') state.currentSan = Math.max(0, num);
      saveState();
      refreshAll();
    }

    function fullRest() {
      const stats = calculateMaxStats();
      state.currentPv = stats.maxPv;
      state.currentPe = stats.maxPe;
      state.currentSan = stats.maxSan;
      saveState();
      refreshAll();
      showToast('Descanso Completo', 'PV, PE e Sanidade restaurados ao máximo.', '100%');
    }

    // ==================== RENDER FUNCTIONS ====================
    function initStaticDropdowns() {
      document.getElementById('char-nex').innerHTML = NEX_STEPS.map(n => `<option value="${n}">${n}%</option>`).join('');
      document.getElementById('char-origin').innerHTML = ORIGINS_DB.map(o => `<option value="${o.name}">${o.name}</option>`).join('');
    }

    function renderHeader() {
      // Populate quick agent switcher in header
      const quickSelect = document.getElementById('quick-agent-select');
      if (quickSelect) {
        quickSelect.innerHTML = rosterData.agents.map(ag =>
          `<option value="${ag.id}" ${ag.id === state.id ? 'selected' : ''}>${ag.name || 'Sem Nome'} (${ag.nex}%)</option>`
        ).join('');
      }

      document.getElementById('char-name').value = state.name;
      document.getElementById('char-player').value = state.player;
      document.getElementById('char-origin').value = state.origin;
      document.getElementById('char-class').value = state.charClass;
      document.getElementById('char-rank').value = state.rank;
      document.getElementById('char-affinity').value = state.affinity;
      document.getElementById('char-nex').value = state.nex;
      document.getElementById('char-pp').value = state.pp || 0;

      const pathSelect = document.getElementById('char-path');
      const paths = Object.keys(CLASSES_DB[state.charClass].paths);
      pathSelect.innerHTML = paths.map(p => `<option value="${p}" ${state.path === p ? 'selected' : ''}>${p}</option>`).join('');
    }

    function renderAttributesAndVitals() {
      const container = document.getElementById('attributes-container');
      const budget = getAttributePointsBudget(state.nex);
      const currentSum = Object.values(state.attributes).reduce((a, b) => a + b, 0);
      const spentPoints = currentSum - 5;
      const allowedPoints = budget.totalSumAllowed - 5;

      const pill = document.getElementById('attr-points-pill');
      pill.textContent = `Pontos: ${spentPoints} / ${allowedPoints}`;
      pill.className = spentPoints === allowedPoints
        ? 'px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
        : spentPoints > allowedPoints
          ? 'px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border border-rose-500/40 bg-rose-500/10 text-rose-400'
          : 'px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border accent-border accent-soft-bg accent-text';

      container.innerHTML = ATTRIBUTE_INFO.map(attr => {
        const val = state.attributes[attr.key];
        return `
          <div class="bg-void border border-borderSubtle hover:border-zinc-600 rounded-xl p-2 flex flex-col items-center justify-between transition group">
            <button onclick="rollAttributeTest('${attr.key}', '${attr.name}')" title="Rolar ${attr.name}"
              class="text-[11px] font-bold tracking-wider text-zinc-400 group-hover:accent-text transition uppercase">
              ${attr.key}
            </button>
            <button onclick="rollAttributeTest('${attr.key}', '${attr.name}')"
              class="text-xl sm:text-2xl font-mono font-bold text-white my-1 hover:scale-110 transition">
              ${val}
            </button>
            <div class="flex items-center gap-1 w-full">
              <button onclick="adjustAttribute('${attr.key}', -1)" ${val <= 0 ? 'disabled' : ''}
                class="flex-1 py-0.5 rounded bg-elevated hover:bg-zinc-700 disabled:opacity-30 text-[11px] font-mono text-zinc-300">-</button>
              <button onclick="adjustAttribute('${attr.key}', 1)" ${val >= budget.maxPerAttr ? 'disabled' : ''}
                class="flex-1 py-0.5 rounded bg-elevated hover:bg-zinc-700 disabled:opacity-30 text-[11px] font-mono text-zinc-300">+</button>
            </div>
          </div>
        `;
      }).join('');

      const stats = calculateMaxStats();

      document.getElementById('pv-current').value = state.currentPv;
      document.getElementById('pv-max').textContent = stats.maxPv;
      document.getElementById('pv-bar').style.width = `${Math.min(100, Math.max(0, (state.currentPv / stats.maxPv) * 100))}%`;
      document.getElementById('pv-status-tag').classList.toggle('hidden', state.currentPv > Math.floor(stats.maxPv / 2));

      document.getElementById('pe-current').value = state.currentPe;
      document.getElementById('pe-max').textContent = stats.maxPe;
      document.getElementById('pe-turn-limit').textContent = stats.peLimit;
      document.getElementById('pe-bar').style.width = `${Math.min(100, Math.max(0, (state.currentPe / stats.maxPe) * 100))}%`;

      document.getElementById('san-current').value = state.currentSan;
      document.getElementById('san-max').textContent = stats.maxSan;
      document.getElementById('san-bar').style.width = `${Math.min(100, Math.max(0, (state.currentSan / stats.maxSan) * 100))}%`;
      document.getElementById('san-status-tag').classList.toggle('hidden', state.currentSan > Math.floor(stats.maxSan / 2));

      document.getElementById('defense-total').textContent = stats.defense;
      document.getElementById('overload-alert').classList.toggle('hidden', !stats.isOverloaded);
      document.getElementById('ritual-dt').textContent = stats.ritualDt;
      document.getElementById('ritual-tab-dt').textContent = stats.ritualDt;

      const effectiveSpeed = Math.max(0, (state.speed || 9) - (stats.isOverloaded ? 3 : 0));
      document.getElementById('char-speed').value = state.speed || 9;
      document.getElementById('speed-squares').textContent = `${Math.floor(effectiveSpeed / 1.5)} quad.`;

      document.getElementById('reaction-dodge').textContent = stats.dodge;
      document.getElementById('reaction-block').textContent = stats.blockRd;
      document.getElementById('defense-other').value = state.defenseOther || 0;
    }

    function renderTrainingAutomationPanel() {
      const panel = document.getElementById('training-automation-panel');
      const quota = getSkillQuotaSummary();
      const { originSkills, classSkills } = quota.mandatory;

      const trainedOk = quota.actualTrained <= quota.totalTrainedAllowed;
      const vetOk = quota.actualVeteranOrHigher <= quota.veteranSlotsAllowed;
      const expOk = quota.actualExpert <= quota.expertSlotsAllowed;

      let classInteractiveHtml = '';
      if (state.charClass === 'Combatente') {
        classInteractiveHtml = `
          <div class="flex flex-wrap items-center gap-3 pt-2 border-t border-borderSubtle/70 text-xs">
            <span class="text-zinc-400 font-medium">Escolhas Obrigatórias de Combatente:</span>
            <div class="inline-flex rounded-lg bg-surface p-0.5 border border-borderSubtle">
              <button onclick="setCombatenteChoice('attack', 'Luta')" class="px-2.5 py-1 rounded-md font-medium transition ${state.combatenteAttackSkill === 'Luta' ? 'accent-bg text-white' : 'text-zinc-400 hover:text-white'}">Luta</button>
              <button onclick="setCombatenteChoice('attack', 'Pontaria')" class="px-2.5 py-1 rounded-md font-medium transition ${state.combatenteAttackSkill === 'Pontaria' ? 'accent-bg text-white' : 'text-zinc-400 hover:text-white'}">Pontaria</button>
            </div>
            <span class="text-zinc-600">+</span>
            <div class="inline-flex rounded-lg bg-surface p-0.5 border border-borderSubtle">
              <button onclick="setCombatenteChoice('defense', 'Fortitude')" class="px-2.5 py-1 rounded-md font-medium transition ${state.combatenteDefenseSkill === 'Fortitude' ? 'accent-bg text-white' : 'text-zinc-400 hover:text-white'}">Fortitude</button>
              <button onclick="setCombatenteChoice('defense', 'Reflexos')" class="px-2.5 py-1 rounded-md font-medium transition ${state.combatenteDefenseSkill === 'Reflexos' ? 'accent-bg text-white' : 'text-zinc-400 hover:text-white'}">Reflexos</button>
            </div>
            <span class="text-zinc-500 text-[11px]">+ (${1 + state.attributes.INT} perícias livres de Classe + INT)</span>
          </div>
        `;
      } else if (state.charClass === 'Ocultista') {
        classInteractiveHtml = `
          <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-borderSubtle/70 text-xs">
            <span class="text-zinc-400 font-medium">Treinamento Automático de Ocultista:</span>
            <span class="px-2 py-0.5 rounded bg-surface border border-borderSubtle text-zinc-200 font-mono">Ocultismo (+5)</span>
            <span class="px-2 py-0.5 rounded bg-surface border border-borderSubtle text-zinc-200 font-mono">Vontade (+5)</span>
            <span class="text-zinc-500 text-[11px]">+ (${3 + state.attributes.INT} perícias livres de Classe + INT)</span>
          </div>
        `;
      } else if (state.charClass === 'Especialista') {
        const trainedCandidates = OFFICIAL_SKILLS.filter(s => (state.skills[s.name]?.rank || 0) >= 5 && s.name !== 'Luta' && s.name !== 'Pontaria');
        const peritoList = state.peritoSkills || [];
        classInteractiveHtml = `
          <div class="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-borderSubtle/70 text-xs">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-zinc-400 font-medium">Especialista — Perito (${getPeritoDie()} por 2 PE):</span>
              <span class="text-zinc-300 font-mono">${peritoList.length ? peritoList.join(' • ') : 'Selecione até 2 perícias treinadas abaixo'}</span>
            </div>
            <div class="flex flex-wrap items-center gap-1">
              ${trainedCandidates.map(c => {
                const active = peritoList.includes(c.name);
                return `<button onclick="togglePeritoSkill('${c.name}')" class="px-2 py-0.5 rounded text-[11px] font-mono border transition ${active ? 'accent-border accent-soft-bg accent-text font-semibold' : 'bg-surface border-borderSubtle text-zinc-400 hover:text-zinc-200'}">${c.name}</button>`;
              }).join('')}
            </div>
          </div>
        `;
      }

      panel.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <span class="text-zinc-400">Origem (<strong class="text-white">${state.origin}</strong>):</span>
            ${originSkills.length
              ? originSkills.map(s => `<span class="px-2 py-0.5 rounded accent-soft-bg accent-text border accent-border font-mono text-[11px]">${s}</span>`).join('')
              : `<span class="px-2 py-0.5 rounded bg-surface border border-borderSubtle text-zinc-300 font-mono text-[11px]">+2 Perícias Livres à Escolha</span>`
            }
          </div>

          <!-- LIVE QUOTA COUNTERS -->
          <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
            <span class="px-2.5 py-1 rounded-lg border ${trainedOk ? 'bg-surface border-borderSubtle text-zinc-200' : 'bg-rose-950/40 border-rose-700 text-rose-300'}">
              Treinadas: <strong>${quota.actualTrained}</strong> / ${quota.totalTrainedAllowed}
            </span>
            <span class="px-2.5 py-1 rounded-lg border ${state.nex < 35 ? 'bg-surface/40 border-borderSubtle/50 text-zinc-500' : vetOk ? 'bg-surface border-borderSubtle text-sky-300' : 'bg-rose-950/40 border-rose-700 text-rose-300'}">
              Veterano (35%): <strong>${quota.actualVeteranOrHigher}</strong> / ${quota.veteranSlotsAllowed}
            </span>
            <span class="px-2.5 py-1 rounded-lg border ${state.nex < 70 ? 'bg-surface/40 border-borderSubtle/50 text-zinc-500' : expOk ? 'bg-surface border-borderSubtle text-amber-300' : 'bg-rose-950/40 border-rose-700 text-rose-300'}">
              Expert (70%): <strong>${quota.actualExpert}</strong> / ${quota.expertSlotsAllowed}
            </span>
          </div>
        </div>
        ${classInteractiveHtml}
      `;
    }

    function renderCombatAndSkills() {
      const stats = calculateMaxStats();
      enforceMandatorySkills();

      // Weapons Panel
      const weapons = state.inventory.filter(i => i.type === 'Arma');
      const wContainer = document.getElementById('combat-weapons-list');
      if (weapons.length === 0) {
        wContainer.innerHTML = `<div class="col-span-full text-center py-6 text-xs text-zinc-500 border border-dashed border-borderSubtle rounded-xl">Nenhuma arma equipada. Adicione armas no Catálogo na aba Inventário.</div>`;
      } else {
        wContainer.innerHTML = weapons.map(w => {
          const skillData = state.skills[w.skill] || { attr: 'FOR', rank: 0, other: 0 };
          const eff = computeItemEffectiveStats(w);
          const totalBonus = skillData.rank + (skillData.other || 0) + eff.attackBonus;
          const modLabels = eff.activeMods.map(m => m.name).join(', ');
          return `
            <div class="bg-void border border-borderSubtle rounded-xl p-3.5 flex flex-col justify-between gap-3">
              <div>
                <div class="flex items-center justify-between gap-2">
                  <h4 class="font-semibold text-sm text-white">${w.name} ${modLabels ? `<span class="text-xs font-normal accent-text">(${modLabels})</span>` : ''}</h4>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 shrink-0">Crit ${eff.effectiveCrit}</span>
                </div>
                <p class="text-xs text-zinc-400 font-mono mt-1">
                  Perícia: <strong class="text-zinc-200">${w.skill} (${totalBonus >= 0 ? '+' + totalBonus : totalBonus})</strong> • Dano: <strong class="accent-text">${eff.effectiveDamage}</strong>
                </p>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <button onclick="rollSkillTest('${w.skill}', '${w.name} (Ataque)', ${eff.attackBonus})" class="py-1.5 rounded-lg bg-elevated hover:bg-zinc-800 text-xs font-medium text-zinc-200 transition">
                  🎯 Atacar
                </button>
                <button onclick="rollDamageFormula('${eff.effectiveDamage}', '${w.name} (Dano)', 1)" class="py-1.5 rounded-lg accent-soft-bg hover:brightness-125 border accent-border text-xs font-medium accent-text transition">
                  💥 Dano
                </button>
                <button onclick="rollDamageFormula('${eff.effectiveDamage}', '${w.name} (CRÍTICO x${eff.critMultiplier})', ${eff.critMultiplier})" title="Rola o dano multiplicando os dados da arma por x${eff.critMultiplier}" class="py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-xs font-semibold text-amber-300 transition">
                  ⚡ Crit x${eff.critMultiplier}
                </button>
              </div>
            </div>
          `;
        }).join('');
      }

      // Render Training Automation Panel
      renderTrainingAutomationPanel();

      // Skills Table
      const search = (document.getElementById('skill-search').value || '').toLowerCase();
      const tbody = document.getElementById('skills-table-body');
      const { originSkills, classSkills } = getMandatorySkills();

      document.getElementById('origin-skills-label').textContent = state.origin;
      document.getElementById('class-skills-label').textContent = state.charClass;
      document.getElementById('armor-penalty-badge').classList.toggle('hidden', !stats.heavyArmorEquipped);

      const canVeteran = state.nex >= 35;
      const canExpert = state.nex >= 70;
      const filtered = OFFICIAL_SKILLS.filter(s => s.name.toLowerCase().includes(search));

      tbody.innerHTML = filtered.map(skill => {
        const sData = state.skills[skill.name] || { attr: skill.attr, rank: 0, other: 0 };
        const penalty = (skill.armorPenalty && stats.heavyArmorEquipped) ? -5 : 0;
        const autoPassive = getAutoSkillPassiveBonus(skill.name);
        const total = sData.rank + (parseInt(sData.other) || 0) + penalty + autoPassive;
        const isTrained = sData.rank >= 5;
        const isOriginSkill = originSkills.includes(skill.name);
        const isClassSkill = classSkills.includes(skill.name);
        const isMandatory = isOriginSkill || isClassSkill;
        const isPerito = state.charClass === 'Especialista' && (state.peritoSkills || []).includes(skill.name);

        return `
          <tr class="hover:bg-elevated/40 transition ${isTrained ? 'bg-void/40' : ''}">
            <td class="py-2.5 px-3">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="w-1.5 h-1.5 rounded-full ${isTrained ? 'accent-bg' : 'bg-zinc-700'}"></span>
                <span class="font-medium ${isTrained ? 'text-white' : 'text-zinc-300'}">${skill.name}</span>
                ${isOriginSkill ? '<span class="text-[10px] px-1.5 py-0.2 rounded accent-soft-bg accent-text font-mono">Origem</span>' : ''}
                ${isClassSkill ? '<span class="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/15 text-sky-300 font-mono">Classe</span>' : ''}
                ${!isMandatory && isTrained ? '<span class="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">Livre/INT</span>' : ''}
                ${autoPassive > 0 ? `<span class="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-300 font-mono" title="Bônus automático de Poder">+${autoPassive} Poder</span>` : ''}
                ${isPerito ? `<span class="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-300 font-mono">Perito +${getPeritoDie()}</span>` : ''}
                ${skill.trainedOnly ? '<span class="text-[10px] text-amber-400/80 font-mono" title="Somente Treinada">*</span>' : ''}
                ${skill.armorPenalty ? '<span class="text-[10px] text-zinc-500 font-mono" title="Penalidade de Armadura">+</span>' : ''}
              </div>
            </td>
            <td class="py-2 px-2 text-center">
              <select onchange="updateSkill('${skill.name}', 'attr', this.value)" class="bg-void border border-borderSubtle rounded px-1.5 py-1 text-xs font-mono text-zinc-300 outline-none">
                ${ATTRIBUTE_INFO.map(a => `<option value="${a.key}" ${sData.attr === a.key ? 'selected' : ''}>${a.key}</option>`).join('')}
              </select>
            </td>
            <td class="py-2 px-2 text-center">
              <select onchange="updateSkill('${skill.name}', 'rank', parseInt(this.value))" class="bg-void border border-borderSubtle rounded px-2 py-1 text-xs text-zinc-200 outline-none">
                <option value="0" ${sData.rank === 0 ? 'selected' : ''} ${isMandatory ? 'disabled' : ''}>Destreinado (+0) ${isMandatory ? '🔒' : ''}</option>
                <option value="5" ${sData.rank === 5 ? 'selected' : ''}>Treinado (+5)</option>
                <option value="10" ${sData.rank === 10 ? 'selected' : ''} ${!canVeteran ? 'disabled' : ''}>Veterano (+10) ${!canVeteran ? '🔒 35%' : ''}</option>
                <option value="15" ${sData.rank === 15 ? 'selected' : ''} ${!canExpert ? 'disabled' : ''}>Expert (+15) ${!canExpert ? '🔒 70%' : ''}</option>
              </select>
            </td>
            <td class="py-2 px-2 text-center">
              <input type="number" value="${sData.other || 0}" onchange="updateSkill('${skill.name}', 'other', parseInt(this.value)||0)"
                class="w-12 text-center bg-void border border-borderSubtle rounded py-1 text-xs font-mono text-zinc-300 outline-none" />
            </td>
            <td class="py-2 px-2 text-center font-mono font-bold text-sm ${total > 0 ? 'text-white' : total < 0 ? 'text-rose-400' : 'text-zinc-500'}">
              ${total >= 0 ? '+' + total : total}
            </td>
            <td class="py-2 px-3 text-right">
              <button onclick="rollSkillTest('${skill.name}')" class="px-3 py-1 rounded-lg bg-elevated hover:bg-zinc-700 border border-borderSubtle text-xs font-mono text-zinc-200 transition">
                🎲 ${state.attributes[sData.attr]}d20
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    function updateSkill(skillName, prop, value) {
      if (!state.skills[skillName]) state.skills[skillName] = { attr: 'INT', rank: 0, other: 0 };
      state.skills[skillName][prop] = value;
      saveState();
      refreshAll();
    }

    function renderAbilitiesTab() {
      // 1. Origin & Class Base Cards
      const originObj = ORIGINS_DB.find(o => o.name === state.origin) || ORIGINS_DB[0];
      const classObj = CLASSES_DB[state.charClass];

      document.getElementById('auto-origin-class-cards').innerHTML = `
        <div class="bg-surface border accent-border rounded-2xl p-5 space-y-3 flex flex-col justify-between">
          <div class="space-y-2.5">
            <div class="space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono uppercase tracking-wider accent-text font-semibold">Origem Oficial: ${originObj.name}</span>
                <span class="text-[11px] font-mono text-zinc-400">${originObj.skills.length ? originObj.skills.join(' • ') : 'Livre'}</span>
              </div>
              <p class="text-xs text-zinc-400 italic leading-relaxed border-b border-borderSubtle/70 pb-2.5">${originObj.lore}</p>
            </div>
            <div class="space-y-1">
              <h4 class="text-sm font-bold text-white">${originObj.power}</h4>
              <p class="text-xs text-zinc-300 leading-relaxed">${originObj.desc}</p>
            </div>
          </div>
        </div>

        <div class="bg-surface border border-borderSubtle rounded-2xl p-5 space-y-3">
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">Classe: ${state.charClass}</span>
              <span class="text-[11px] font-mono text-amber-300">NEX 5%</span>
            </div>
            <p class="text-xs text-zinc-400 italic leading-relaxed border-b border-borderSubtle/70 pb-2.5">${classObj.desc}</p>
          </div>
          <div class="space-y-1">
            <h4 class="text-sm font-bold text-white">${classObj.baseAbility.name}</h4>
            <p class="text-xs text-zinc-300 leading-relaxed">${classObj.baseAbility.desc}</p>
          </div>
        </div>
      `;

      // 2. Path Abilities (10%, 40%, 65%, 99%)
      const pathFeatures = classObj.paths[state.path] || [];
      document.getElementById('path-abilities-container').innerHTML = pathFeatures.map(feat => {
        const unlocked = state.nex >= feat.nex;
        return `
          <div class="bg-surface border ${unlocked ? 'border-zinc-700' : 'border-borderSubtle/40 opacity-50'} rounded-2xl p-4 space-y-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded ${unlocked ? 'accent-soft-bg accent-text border accent-border' : 'bg-void text-zinc-500'}">
                  Trilha ${state.path} • NEX ${feat.nex}%
                </span>
              </div>
              <span class="text-[11px] font-mono ${unlocked ? 'text-emerald-400' : 'text-zinc-500'}">
                ${unlocked ? '✓ Desbloqueada' : '🔒 Bloqueada'}
              </span>
            </div>
            <h4 class="font-semibold text-sm text-white">${feat.name}</h4>
            <p class="text-xs text-zinc-300 leading-relaxed">${feat.desc}</p>
          </div>
        `;
      }).join('');

      // 3. Chosen Powers
      const list = document.getElementById('abilities-list');
      if (state.abilities.length === 0) {
        list.innerHTML = `<div class="col-span-full text-center py-8 text-xs text-zinc-500 border border-dashed border-borderSubtle rounded-2xl">Nenhum poder adicional escolhido. Clique em "📖 Catálogo de Poderes" acima para adicionar.</div>`;
      } else {
        list.innerHTML = state.abilities.map(ab => `
          <div class="bg-surface border border-borderSubtle rounded-2xl p-5 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-start justify-between gap-2">
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-semibold text-base text-white">${ab.name}</h4>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 border border-borderSubtle">${ab.source}</span>
                  ${ab.element && ab.element !== 'Nenhum' ? `<span class="text-[10px] font-mono px-2 py-0.5 rounded accent-soft-bg accent-text border accent-border">${ab.element}${ab.affinity ? ' ★ Afinidade' : ''}</span>` : ''}
                </div>
                <div class="flex items-center gap-2">
                  ${ab.cost ? `<span class="text-xs font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded">${ab.cost}</span>` : ''}
                  <button onclick="deleteAbility(${ab.id})" class="text-zinc-500 hover:text-rose-400 text-xs px-1">✕</button>
                </div>
              </div>
              <p class="text-xs text-zinc-300 leading-relaxed mt-3 whitespace-pre-line">${ab.desc}</p>
              ${ab.affinity && ab.affinityDesc ? `<p class="text-xs accent-text mt-2 bg-void p-2 rounded-lg border accent-border">${ab.affinityDesc}</p>` : ''}
            </div>
          </div>
        `).join('');
      }
    }

    function renderRitualsTab() {
      const maxCircle = state.charClass === 'Ocultista'
        ? `${getMaxAccessibleRitualCircle()}º Círculo`
        : 'Via Transcender';
      document.getElementById('ritual-max-circle').textContent = maxCircle;
      document.getElementById('ritual-count').textContent = state.rituals.length;

      const circlePe = { '1': 1, '2': 3, '3': 6, '4': 10 };
      const container = document.getElementById('rituals-list');

      if (state.rituals.length === 0) {
        container.innerHTML = `<div class="col-span-full text-center py-8 text-xs text-zinc-500 border border-dashed border-borderSubtle rounded-2xl">Seu grimório pessoal está vazio. Explore o Catálogo Oficial de Rituais logo abaixo para aprender!</div>`;
      } else {
        container.innerHTML = state.rituals.map(r => {
          const lockReason = getRitualLockReason(r.circle, r);
          const basePe = circlePe[String(r.circle)] || 1;
          const discMatch = (r.discente || '').match(/\(\+(\d+)\s*PE\)/i);
          const verdMatch = (r.verdadeira || '').match(/\(\+(\d+)\s*PE\)/i);
          const discExtra = discMatch ? parseInt(discMatch[1]) : null;
          const verdExtra = verdMatch ? parseInt(verdMatch[1]) : null;

          return `
            <div class="bg-void border border-borderSubtle rounded-2xl p-4 space-y-2.5">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h4 class="font-semibold text-sm text-white">${r.name}</h4>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded accent-soft-bg accent-text border accent-border">${r.element} ${r.circle}º</span>
                  </div>
                  <p class="text-[11px] text-zinc-400 mt-1 font-mono">${r.cast} • ${r.range} • ${r.duration}</p>
                </div>
                <div class="flex items-center gap-1.5 flex-wrap justify-end">
                  <button onclick="castRitual('${r.name}', ${basePe}, 'Padrão')" ${lockReason ? 'disabled' : ''} title="${lockReason}" class="text-[11px] font-mono px-2.5 py-1 rounded-lg ${lockReason ? 'bg-elevated text-zinc-500 cursor-not-allowed' : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30'} transition">
                    ${lockReason ? '🔒 Bloqueado' : `Padrão (-${basePe} PE)`}
                  </button>
                  ${discExtra !== null ? `
                    <button onclick="castRitual('${r.name}', ${basePe + discExtra}, 'Discente')" ${lockReason ? 'disabled' : ''} class="text-[11px] font-mono px-2 py-1 rounded-lg bg-elevated hover:bg-zinc-800 text-zinc-200 border border-borderSubtle transition">
                      Discente (-${basePe + discExtra})
                    </button>` : ''}
                  ${verdExtra !== null ? `
                    <button onclick="castRitual('${r.name}', ${basePe + verdExtra}, 'Verdadeiro')" ${lockReason ? 'disabled' : ''} class="text-[11px] font-mono px-2 py-1 rounded-lg accent-soft-bg hover:brightness-125 accent-text border accent-border transition">
                      Verdadeiro (-${basePe + verdExtra})
                    </button>` : ''}
                  <button onclick="deleteRitual(${r.id})" class="text-zinc-500 hover:text-rose-400 text-xs px-1">✕</button>
                </div>
              </div>
              ${lockReason ? `<p class="text-[11px] text-amber-300">${lockReason}</p>` : ''}
              <p class="text-xs text-zinc-300 leading-relaxed">${r.desc}</p>
              ${r.discente && r.discente !== 'Nenhum.' ? `<div class="text-[11px] bg-surface border border-borderSubtle rounded-lg p-2 text-zinc-300"><strong class="text-amber-300">Discente:</strong> ${r.discente}</div>` : ''}
              ${r.verdadeira && r.verdadeira !== 'Nenhum.' ? `<div class="text-[11px] bg-surface border border-borderSubtle rounded-lg p-2 text-zinc-300"><strong class="accent-text">Verdadeiro:</strong> ${r.verdadeira}</div>` : ''}
            </div>
          `;
        }).join('');
      }

      renderRitualCompendium();
    }

    function getMaxAccessibleRitualCircle() {
      if (state.charClass !== 'Ocultista') return 1;
      if (state.nex >= 85) return 4;
      if (state.nex >= 55) return 3;
      if (state.nex >= 25) return 2;
      return 1;
    }

    function getRitualLockReason(circle, ritual) {
      const officialRitual = typeof ritual === 'string'
        ? RITUALS_COMPENDIUM.find(item => item.name === ritual)
        : RITUALS_COMPENDIUM.find(item => item.name === ritual?.name);
      const exclusivePath = officialRitual?.exclusivePath || ritual?.exclusivePath;
      if (exclusivePath && (state.charClass !== 'Ocultista' || state.path !== exclusivePath || state.nex < 99)) {
        return `Requer a trilha ${exclusivePath} e NEX 99%.`;
      }

      if (circle <= getMaxAccessibleRitualCircle()) return '';
      if (state.charClass !== 'Ocultista') {
        return 'Agentes de outras classes só acessam rituais de 1º círculo via Transcender.';
      }

      const requiredNex = { 2: 25, 3: 55, 4: 85 }[circle];
      return `Requer NEX ${requiredNex}% para acessar este círculo.`;
    }

    function castRitual(name, peCost, form = 'Padrão') {
      const ritual = state.rituals.find(item => item.name === name)
        || RITUALS_COMPENDIUM.find(item => item.name === name);
      const lockReason = getRitualLockReason(Number(ritual?.circle) || 1, ritual || name);
      if (lockReason) {
        showToast('Ritual Bloqueado', lockReason, '🔒');
        return;
      }
      const stats = calculateMaxStats();
      if (state.currentPe < peCost) {
        showToast('PE Insuficiente!', `Você precisa de ${peCost} PE para conjurar ${name} (${form}).`, '!');
        return;
      }
      const limitWarning = peCost > stats.peLimit ? ` ⚠️ Excede Limite/Turno (${stats.peLimit} PE)!` : '';
      state.currentPe -= peCost;
      saveState();
      refreshAll();
      showToast(`Ritual (${form}): ${name}`, `Gasto de ${peCost} PE • DT ${stats.ritualDt}.${limitWarning}`, `-${peCost} PE`);
    }

    function renderRitualCompendium() {
      const search = (document.getElementById('comp-ritual-search').value || '').toLowerCase();
      const circleFilter = document.getElementById('comp-ritual-circle').value;
      const elemFilter = document.getElementById('comp-ritual-element').value;

      const filtered = RITUALS_COMPENDIUM.filter(r => {
        const matchSearch = r.name.toLowerCase().includes(search) || r.desc.toLowerCase().includes(search);
        const matchCircle = circleFilter === 'Todos' || String(r.circle) === circleFilter;
        const matchElem = elemFilter === 'Todos' || r.element === elemFilter;
        return matchSearch && matchCircle && matchElem;
      });

      const circlePe = { 1: '1 PE', 2: '3 PE', 3: '6 PE', 4: '10 PE' };
      const grid = document.getElementById('compendium-rituals-grid');

      grid.innerHTML = filtered.map((r, idx) => {
        const alreadyLearned = state.rituals.some(learned => learned.name === r.name);
        const lockReason = getRitualLockReason(r.circle, r);
        const globalIndex = RITUALS_COMPENDIUM.indexOf(r);
        return `
          <div class="bg-void border border-borderSubtle rounded-2xl p-4 flex flex-col justify-between gap-3 ${lockReason ? 'opacity-50' : ''}">
            <div class="space-y-2">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h4 class="font-semibold text-sm text-white">${r.name}</h4>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 border border-borderSubtle">${r.element} • ${r.circle}º Círculo</span>
                    <span class="text-[10px] font-mono text-amber-300">${circlePe[r.circle]}</span>
                  </div>
                  <p class="text-[10px] text-zinc-400 font-mono mt-1">
                    Execução: ${r.cast} | Alcance: ${r.range} | Alvo: ${r.target} | Duração: ${r.duration} | Resist: ${r.resist}
                  </p>
                </div>
                <button onclick="learnFromCompendium(${globalIndex})" ${(alreadyLearned || lockReason) ? 'disabled' : ''}
                  title="${lockReason}"
                  class="shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${alreadyLearned ? 'bg-emerald-500/15 text-emerald-400 cursor-default' : lockReason ? 'bg-elevated text-zinc-500 cursor-not-allowed' : 'accent-bg text-white hover:brightness-110'}">
                  ${alreadyLearned ? '✓ Aprendido' : lockReason ? '🔒 Bloqueado' : '+ Aprender Ritual'}
                </button>
              </div>
              ${lockReason ? `<p class="text-[11px] text-amber-300">${lockReason}</p>` : ''}
              <p class="text-xs text-zinc-300 leading-relaxed">${r.desc}</p>
              ${r.discente && r.discente !== 'Nenhum.' ? `<p class="text-[11px] text-zinc-400"><strong class="text-amber-300">Discente:</strong> ${r.discente}</p>` : ''}
              ${r.verdadeira && r.verdadeira !== 'Nenhum.' ? `<p class="text-[11px] text-zinc-400"><strong class="accent-text">Verdadeiro:</strong> ${r.verdadeira}</p>` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    function learnFromCompendium(index) {
      const r = RITUALS_COMPENDIUM[index];
      if (!r || state.rituals.some(item => item.name === r.name)) return;
      const lockReason = getRitualLockReason(r.circle, r);
      if (lockReason) {
        showToast('Ritual Bloqueado', lockReason, '🔒');
        return;
      }
      state.rituals.push({
        id: Date.now() + Math.random(),
        ...r,
        circle: String(r.circle)
      });
      saveState();
      refreshAll();
      showToast('Ritual Transcrito', `${r.name} (${r.circle}º Círculo) adicionado ao seu grimório!`, '+1');
    }

    function renderInventoryTab() {
      const stats = calculateMaxStats();

      document.getElementById('load-current').textContent = stats.currentSpaces;
      document.getElementById('load-max').textContent = stats.maxSpaces;
      document.getElementById('load-overload-max').textContent = stats.maxSpaces * 2;
      const loadPct = Math.min(100, (stats.currentSpaces / stats.maxSpaces) * 100);
      const loadBar = document.getElementById('load-bar');
      loadBar.style.width = `${loadPct}%`;
      loadBar.className = stats.isOverloaded ? 'h-full bg-rose-500 transition-all duration-300' : 'h-full bg-emerald-500 transition-all duration-300';

      const loadBadge = document.getElementById('load-status-badge');
      loadBadge.textContent = stats.isOverloaded ? 'Sobrecarregado (-5 Def / -3m)' : 'Carga Normal';
      loadBadge.className = stats.isOverloaded
        ? 'text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-400'
        : 'text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400';

      document.getElementById('inv-rank-name').textContent = state.rank;
      const limits = PATENT_LIMITS[state.rank] || PATENT_LIMITS['Recruta'];
      const catCounts = { I: 0, II: 0, III: 0, IV: 0 };
      state.inventory.forEach(it => {
        const effCat = computeItemEffectiveStats(it).effectiveCat;
        if (catCounts[effCat] !== undefined) catCounts[effCat]++;
      });

      document.getElementById('category-limits-grid').innerHTML = ['I', 'II', 'III', 'IV'].map(cat => {
        const used = catCounts[cat];
        const max = limits[cat];
        const over = used > max;
        return `
          <div class="bg-void border ${over ? 'border-rose-500/50' : 'border-borderSubtle'} rounded-xl p-2.5 text-center">
            <span class="block text-[10px] uppercase text-zinc-500 font-semibold">Categoria ${cat}</span>
            <span class="font-mono text-lg font-bold ${over ? 'text-rose-400' : 'text-white'}">${used} <span class="text-xs font-normal text-zinc-500">/ ${max}</span></span>
          </div>
        `;
      }).join('');

      const tbody = document.getElementById('inventory-table-body');
      if (state.inventory.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-xs text-zinc-500">Mochila vazia. Adicione equipamentos no catálogo abaixo.</td></tr>`;
      } else {
        tbody.innerHTML = state.inventory.map(it => {
          const eff = computeItemEffectiveStats(it);
          const modBadges = eff.activeMods.map(m =>
            `<span class="inline-block text-[10px] font-mono px-1.5 py-0.2 rounded accent-soft-bg accent-text border accent-border mr-1">${m.name}</span>`
          ).join('');

          let details = it.desc || '-';
          if (it.type === 'Arma') {
            const atkTag = eff.attackBonus > 0 ? ` (+${eff.attackBonus} Atq)` : '';
            details = `<span class="font-mono text-zinc-200">${it.skill}${atkTag} • Dano ${eff.effectiveDamage} (${eff.effectiveCrit})</span> — ${it.desc || ''}`;
          } else if (it.type === 'Proteção') {
            details = `<span class="font-mono text-sky-300">+${eff.effectiveDefense} Defesa</span> — ${it.desc || ''}`;
          }

          return `
            <tr class="hover:bg-elevated/40 transition">
              <td class="py-2.5 px-3">
                <div class="font-medium text-white">${it.name}</div>
                ${modBadges ? `<div class="mt-1 flex flex-wrap gap-1">${modBadges}</div>` : ''}
              </td>
              <td class="py-2.5 px-2 text-center text-xs text-zinc-400">${it.type}</td>
              <td class="py-2.5 px-2 text-center font-mono text-xs ${eff.effectiveCat !== it.cat ? 'accent-text font-bold' : 'text-zinc-300'}">${eff.effectiveCat}</td>
              <td class="py-2.5 px-2 text-center font-mono text-xs text-zinc-300">${eff.effectiveSpaces}</td>
              <td class="py-2.5 px-3 text-xs text-zinc-400">${details}</td>
              <td class="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                <button onclick="openItemModsModal(${it.id})" title="Aplicar Aprimoramentos (Cruel, Certeira, Perigosa...)"
                  class="text-[11px] px-2 py-0.5 rounded bg-elevated hover:bg-zinc-700 border border-borderSubtle text-zinc-200 transition">
                  ⚙ Aprimorar${eff.activeMods.length ? ` (${eff.activeMods.length})` : ''}
                </button>
                ${it.type === 'Proteção' ? `
                  <button onclick="toggleEquipItem(${it.id})" class="text-[11px] px-2 py-0.5 rounded ${it.equipped ? 'bg-emerald-500/15 text-emerald-300' : 'bg-elevated text-zinc-400'}">
                    ${it.equipped ? 'Equipada' : 'Equipar'}
                  </button>` : ''}
                <button onclick="deleteItem(${it.id})" class="text-zinc-500 hover:text-rose-400 text-xs px-1">✕</button>
              </td>
            </tr>
          `;
        }).join('');
      }

      renderItemCompendium();
    }

    function renderItemCompendium() {
      const search = (document.getElementById('comp-item-search').value || '').toLowerCase();
      const typeFilter = document.getElementById('comp-item-type').value;
      const catFilter = document.getElementById('comp-item-cat').value;

      const filtered = ITEMS_COMPENDIUM.filter(it => {
        const matchSearch = it.name.toLowerCase().includes(search) || it.desc.toLowerCase().includes(search);
        const matchType = typeFilter === 'Todos' || it.type === typeFilter;
        const matchCat = catFilter === 'Todas' || it.cat === catFilter;
        return matchSearch && matchType && matchCat;
      });

      const grid = document.getElementById('compendium-items-grid');
      grid.innerHTML = filtered.map(it => {
        const globalIndex = ITEMS_COMPENDIUM.indexOf(it);
        let badgeStat = '';
        if (it.type === 'Arma') badgeStat = `${it.damage} (${it.crit})`;
        else if (it.type === 'Proteção') badgeStat = `+${it.defense} Def`;

        return `
          <div class="bg-void border border-borderSubtle rounded-xl p-3.5 flex flex-col justify-between gap-2.5">
            <div>
              <div class="flex items-start justify-between gap-2">
                <h4 class="font-semibold text-sm text-white">${it.name}</h4>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 shrink-0">Cat ${it.cat} • ${it.spaces} esp.</span>
              </div>
              <div class="flex items-center gap-2 mt-1 text-[11px] font-mono">
                <span class="text-zinc-400">${it.type}</span>
                ${badgeStat ? `<span class="accent-text font-semibold">• ${badgeStat}</span>` : ''}
              </div>
              <p class="text-xs text-zinc-400 mt-1.5 leading-relaxed">${it.desc}</p>
            </div>
            <button onclick="addItemFromCompendium(${globalIndex})"
              class="w-full py-1.5 rounded-lg bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs font-medium text-zinc-200 transition">
              + Adicionar ao Inventário
            </button>
          </div>
        `;
      }).join('');
    }

    function addItemFromCompendium(index) {
      const it = ITEMS_COMPENDIUM[index];
      if (!it) return;
      state.inventory.push({
        id: Date.now() + Math.random(),
        ...it,
        equipped: it.type === 'Proteção' ? true : undefined
      });
      saveState();
      refreshAll();
      showToast('Equipamento Adicionado', `${it.name} (Cat ${it.cat}) colocado no inventário.`, `+${it.spaces} esp.`);
    }

    function renderPowerCompendium() {
      const search = (document.getElementById('comp-power-search').value || '').toLowerCase();
      const catFilter = document.getElementById('comp-power-category').value;

      const filtered = POWERS_COMPENDIUM.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search) || p.req.toLowerCase().includes(search);
        const matchCat = catFilter === 'Todos' || p.category === catFilter;
        return matchSearch && matchCat;
      });

      const grid = document.getElementById('compendium-powers-grid');
      grid.innerHTML = filtered.map(p => {
        const globalIndex = POWERS_COMPENDIUM.indexOf(p);
        const isParanormal = Boolean(p.element);
        return `
          <div class="bg-void border border-borderSubtle rounded-xl p-4 flex flex-col justify-between gap-3">
            <div>
              <div class="flex items-start justify-between gap-2">
                <h4 class="font-semibold text-sm text-white">${p.name}</h4>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-zinc-300 border border-borderSubtle shrink-0">${p.category}</span>
              </div>
              <div class="flex items-center gap-2 mt-1 text-[10px] font-mono text-zinc-400">
                <span>Req: ${p.req}</span>
                <span>•</span>
                <span class="text-amber-300">${p.cost}</span>
              </div>
              <p class="text-xs text-zinc-300 mt-2 leading-relaxed">${p.desc}</p>
              ${p.affinityDesc ? `<p class="text-[11px] accent-text mt-1.5">${p.affinityDesc}</p>` : ''}
            </div>
            <div class="flex items-center gap-2 pt-1">
              <button onclick="addPowerFromCompendium(${globalIndex}, false)"
                class="flex-1 py-1.5 rounded-lg bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs font-medium text-zinc-200 transition">
                + Adicionar Poder
              </button>
              ${isParanormal ? `
                <button onclick="addPowerFromCompendium(${globalIndex}, true)"
                  class="px-2.5 py-1.5 rounded-lg accent-soft-bg hover:brightness-125 border accent-border text-xs font-semibold accent-text transition">
                  + c/ Afinidade
                </button>` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    function addPowerFromCompendium(index, withAffinity) {
      const p = POWERS_COMPENDIUM[index];
      if (!p) return;
      state.abilities.push({
        id: Date.now() + Math.random(),
        name: p.name,
        source: p.element ? 'Poder Paranormal' : `Poder de ${p.category}`,
        cost: p.cost,
        element: p.element || 'Nenhum',
        affinity: withAffinity,
        desc: p.desc,
        affinityDesc: p.affinityDesc || ''
      });
      saveState();
      refreshAll();
      showToast('Poder Adicionado', `${p.name}${withAffinity ? ' (com Afinidade)' : ''} adicionado à ficha!`, '+1');
    }

    function renderNotesAndTimeline() {
      document.getElementById('bonus-pv').value = state.bonusPv || 0;
      document.getElementById('bonus-pe').value = state.bonusPe || 0;
      document.getElementById('bonus-san').value = state.bonusSan || 0;
      document.getElementById('char-rd').value = state.rd || '';
      document.getElementById('char-proficiencies').value = state.proficiencies || '';
      document.getElementById('char-notes').value = state.notes || '';
      document.getElementById('char-clues').value = state.clues || '';
      document.getElementById('timeline-current-nex').textContent = `${state.nex}%`;

      const grid = document.getElementById('nex-timeline-grid');
      grid.innerHTML = NEX_STEPS.map(step => {
        const isCurrent = state.nex === step;
        const isPassed = state.nex >= step;
        return `
          <button onclick="updateField('nex', ${step})"
            class="p-2.5 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${isCurrent ? 'accent-border accent-soft-bg' : isPassed ? 'bg-void border-zinc-700' : 'bg-void/40 border-borderSubtle/50 opacity-55 hover:opacity-90'}">
            <span class="font-mono text-xs font-bold ${isCurrent ? 'accent-text' : isPassed ? 'text-white' : 'text-zinc-400'}">${step}%</span>
            <span class="text-[10px] text-zinc-400 leading-tight line-clamp-2">${NEX_MILESTONES[step] || 'Evolução'}</span>
          </button>
        `;
      }).join('');
    }

    function refreshAll() {
      applyTheme();
      renderHeader();
      renderAttributesAndVitals();
      renderCombatAndSkills();
      renderAbilitiesTab();
      renderRitualsTab();
      renderInventoryTab();
      renderNotesAndTimeline();
    }

    // ==================== DICE ROLLING ENGINE & SESSION LOG ====================
    const sessionRollHistory = [];

    function logSessionRoll(title, detail, result, isCrit = false, isFumble = false) {
      const now = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      sessionRollHistory.unshift({
        agent: state?.name || 'Agente',
        time: now,
        title,
        detail: detail.replace(/<[^>]*>/g, ''),
        result,
        isCrit,
        isFumble
      });
      if (sessionRollHistory.length > 40) sessionRollHistory.pop();
      const badge = document.getElementById('roll-history-count');
      if (badge) badge.textContent = sessionRollHistory.length;
    }

    function openRollHistoryModal() {
      const list = document.getElementById('roll-history-list');
      if (sessionRollHistory.length === 0) {
        list.innerHTML = `<div class="text-center py-8 text-xs text-zinc-500">Nenhuma rolagem registrada nesta sessão ainda.</div>`;
      } else {
        list.innerHTML = sessionRollHistory.map(item => `
          <div class="bg-void border ${item.isCrit ? 'border-amber-400/60' : item.isFumble ? 'border-rose-500/60' : 'border-borderSubtle'} rounded-xl p-3 flex items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-[10px] font-mono text-zinc-500">${item.time}</span>
                <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-surface text-zinc-300">${item.agent}</span>
                <span class="text-xs font-semibold text-white">${item.title}</span>
              </div>
              <p class="text-xs font-mono text-zinc-400 mt-1">${item.detail}</p>
            </div>
            <span class="text-lg font-mono font-bold ${item.isCrit ? 'text-amber-300' : item.isFumble ? 'text-rose-400' : 'accent-text'} shrink-0">
              ${item.result}
            </span>
          </div>
        `).join('');
      }
      openModal('modal-roll-history');
    }

    function clearRollHistory() {
      sessionRollHistory.length = 0;
      const badge = document.getElementById('roll-history-count');
      if (badge) badge.textContent = '0';
      openRollHistoryModal();
    }

    function openInterludeModal() {
      const stats = calculateMaxStats();
      document.getElementById('interlude-pe-lim').textContent = stats.peLimit;
      openModal('modal-interlude');
    }

    function applyInterludeAction(action) {
      const stats = calculateMaxStats();
      const lim = stats.peLimit;
      if (action === 'sleep_normal') {
        state.currentPv = Math.min(stats.maxPv, state.currentPv + lim);
        state.currentPe = Math.min(stats.maxPe, state.currentPe + lim);
        showToast('Interlúdio: Dormir', `Recuperou +${lim} PV e +${lim} PE.`, `+${lim}`);
      } else if (action === 'sleep_comfort') {
        const gain = lim * 2;
        state.currentPv = Math.min(stats.maxPv, state.currentPv + gain);
        state.currentPe = Math.min(stats.maxPe, state.currentPe + gain);
        showToast('Interlúdio: Confortável', `Recuperou +${gain} PV e +${gain} PE.`, `+${gain}`);
      } else if (action === 'relax') {
        state.currentSan = Math.min(stats.maxSan, state.currentSan + lim);
        showToast('Interlúdio: Relaxar', `Recuperou +${lim} de Sanidade.`, `+${lim} SAN`);
      }
      saveState();
      refreshAll();
      closeModal('modal-interlude');
    }

    function rollDie(sides) {
      return Math.floor(Math.random() * sides) + 1;
    }

    function rollAttributeTest(attrKey, attrName) {
      const attrVal = state.attributes[attrKey] || 0;
      const diceCount = attrVal <= 0 ? 2 : attrVal;
      const keepHighest = attrVal > 0;

      const rolls = [];
      for (let i = 0; i < diceCount; i++) rolls.push(rollDie(20));

      const chosen = keepHighest ? Math.max(...rolls) : Math.min(...rolls);
      const formattedRolls = rolls.map(r => r === chosen ? `<strong class="text-white underline">${r}</strong>` : r).join(', ');
      const modeText = keepHighest ? `${diceCount}d20↑` : '2d20↓';

      showToast(
        `Teste de ${attrName} (${attrKey})`,
        `${modeText}: [${formattedRolls}]`,
        chosen,
        chosen === 20,
        chosen === 1
      );
    }

    function rollSkillTest(skillName, customTitle = null, extraBonus = 0) {
      const stats = calculateMaxStats();
      const skillMeta = OFFICIAL_SKILLS.find(s => s.name === skillName);
      const sData = state.skills[skillName] || { attr: 'INT', rank: 0, other: 0 };
      const attrVal = state.attributes[sData.attr] || 0;
      const penalty = (skillMeta?.armorPenalty && stats.heavyArmorEquipped) ? -5 : 0;
      const autoPassive = getAutoSkillPassiveBonus(skillName);
      const bonus = sData.rank + (parseInt(sData.other) || 0) + penalty + autoPassive + (parseInt(extraBonus) || 0);

      const diceCount = attrVal <= 0 ? 2 : attrVal;
      const keepHighest = attrVal > 0;

      const rolls = [];
      for (let i = 0; i < diceCount; i++) rolls.push(rollDie(20));

      const chosen = keepHighest ? Math.max(...rolls) : Math.min(...rolls);
      const total = chosen + bonus;
      const formattedRolls = rolls.map(r => r === chosen ? `<strong class="text-white underline">${r}</strong>` : r).join(', ');
      const modeText = keepHighest ? `${diceCount}d20↑` : '2d20↓';
      const sign = bonus >= 0 ? `+${bonus}` : `${bonus}`;

      showToast(
        customTitle || `Perícia: ${skillName} (${sData.attr})`,
        `${modeText}: [${formattedRolls}] → ${chosen} ${sign}`,
        total,
        chosen === 20,
        chosen === 1
      );
    }

    function rollDamageFormula(formula, label, critMult = 1) {
      rollCustomFormula(formula, label, critMult);
    }

    function rollCustomFormula(formula, label = 'Rolagem de Dados', critMult = 1) {
      try {
        const clean = formula.replace(/\s+/g, '').toLowerCase();
        const match = clean.match(/^(\d+)d(\d+)([+-]\d+)?$/);
        if (!match) {
          showToast(label, `Fórmula inválida: ${formula}`, '!');
          return;
        }
        const baseCount = parseInt(match[1]);
        const count = Math.min(80, baseCount * Math.max(1, critMult));
        const sides = parseInt(match[2]);
        const mod = match[3] ? parseInt(match[3]) : 0;

        const rolls = [];
        for (let i = 0; i < count; i++) rolls.push(rollDie(sides));
        const sum = rolls.reduce((a, b) => a + b, 0) + mod;
        const modStr = mod !== 0 ? (mod > 0 ? ` + ${mod}` : ` - ${Math.abs(mod)}`) : '';

        showToast(label, `${count}d${sides}: [${rolls.join(', ')}]${modStr}`, sum, critMult > 1);
      } catch (e) {
        showToast(label, 'Erro ao processar rolagem', '!');
      }
    }

    function showToast(title, detail, result, isCrit = false, isFumble = false) {
      logSessionRoll(title, detail, result, isCrit, isFumble);
      const container = document.getElementById('toast-container');
      const toast = document.createElement('div');
      const borderClass = isCrit ? 'border-amber-400' : isFumble ? 'border-rose-500' : 'accent-border';
      const numClass = isCrit ? 'text-amber-300' : isFumble ? 'text-rose-400' : 'accent-text';

      toast.className = `toast-enter pointer-events-auto bg-elevated border ${borderClass} rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4`;
      toast.innerHTML = `
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs font-semibold text-white">${title}</span>
            ${isCrit ? '<span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300">20 NATURAL!</span>' : ''}
            ${isFumble ? '<span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300">DESASTRE (1)</span>' : ''}
          </div>
          <p class="text-xs font-mono text-zinc-400 mt-1">${detail}</p>
        </div>
        <div class="text-2xl font-mono font-bold ${numClass} pl-3 border-l border-borderSubtle">
          ${result}
        </div>
      `;
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        toast.style.transition = 'all 0.25s ease';
        setTimeout(() => toast.remove(), 250);
      }, 5000);
    }

    // ==================== NAVIGATION & MODALS ====================
    function switchTab(tabName) {
      document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('tab-active');
        btn.classList.add('text-zinc-400');
      });

      document.getElementById(`tab-${tabName}`).classList.remove('hidden');
      const activeBtn = document.getElementById(`tab-btn-${tabName}`);
      activeBtn.classList.add('tab-active');
      activeBtn.classList.remove('text-zinc-400');
    }

    function openModal(id) {
      const el = document.getElementById(id);
      el.classList.remove('hidden');
      el.classList.add('flex');
    }

    function closeModal(id) {
      const el = document.getElementById(id);
      el.classList.add('hidden');
      el.classList.remove('flex');
    }

    function openCompendiumModal(type) {
      if (type === 'poderes') {
        renderPowerCompendium();
        openModal('modal-poderes');
      }
    }

    function openAbilityModal() { openModal('modal-ability'); }
    function openRitualModal() { openModal('modal-ritual'); }
    function openItemModal() { toggleItemFields(); openModal('modal-item'); }
    function openDiceModal() { openModal('modal-dice'); }

    // ==================== CUSTOM CRUD ====================
    function saveAbility() {
      const name = document.getElementById('ab-name').value.trim();
      if (!name) return;

      state.abilities.push({
        id: Date.now(),
        name,
        source: document.getElementById('ab-source').value,
        cost: document.getElementById('ab-cost').value.trim(),
        element: document.getElementById('ab-element').value,
        affinity: document.getElementById('ab-affinity').checked,
        desc: document.getElementById('ab-desc').value.trim()
      });

      document.getElementById('ab-name').value = '';
      document.getElementById('ab-cost').value = '';
      document.getElementById('ab-desc').value = '';
      closeModal('modal-ability');
      saveState();
      refreshAll();
    }

    function deleteAbility(id) {
      state.abilities = state.abilities.filter(a => a.id !== id);
      saveState();
      refreshAll();
    }

    function saveRitual() {
      const name = document.getElementById('rit-name').value.trim();
      if (!name) return;
      const circle = parseInt(document.getElementById('rit-circle').value, 10);
      const lockReason = getRitualLockReason(circle, name);
      if (lockReason) {
        showToast('Ritual Bloqueado', lockReason, '🔒');
        return;
      }

      state.rituals.push({
        id: Date.now(),
        name,
        circle: String(circle),
        element: document.getElementById('rit-element').value,
        cast: document.getElementById('rit-cast').value,
        range: document.getElementById('rit-range').value,
        duration: document.getElementById('rit-duration').value,
        target: document.getElementById('rit-target').value,
        resist: document.getElementById('rit-resist').value,
        desc: document.getElementById('rit-desc').value.trim(),
        discente: document.getElementById('rit-discente').value.trim(),
        verdadeira: document.getElementById('rit-verdadeira').value.trim()
      });

      document.getElementById('rit-name').value = '';
      document.getElementById('rit-desc').value = '';
      document.getElementById('rit-discente').value = '';
      document.getElementById('rit-verdadeira').value = '';
      closeModal('modal-ritual');
      saveState();
      refreshAll();
    }

    function deleteRitual(id) {
      state.rituals = state.rituals.filter(r => r.id !== id);
      saveState();
      refreshAll();
    }

    function toggleItemFields() {
      const type = document.getElementById('it-type').value;
      const wFields = document.getElementById('it-weapon-fields');
      const aFields = document.getElementById('it-armor-fields');

      wFields.classList.toggle('hidden', type !== 'Arma');
      wFields.classList.toggle('grid', type === 'Arma');

      aFields.classList.toggle('hidden', type !== 'Proteção');
      aFields.classList.toggle('grid', type === 'Proteção');
    }

    function saveItem() {
      const name = document.getElementById('it-name').value.trim();
      if (!name) return;

      const type = document.getElementById('it-type').value;
      const item = {
        id: Date.now(),
        name,
        type,
        cat: document.getElementById('it-cat').value,
        spaces: parseFloat(document.getElementById('it-spaces').value) || 0,
        desc: document.getElementById('it-desc').value.trim()
      };

      if (type === 'Arma') {
        item.skill = document.getElementById('it-skill').value;
        item.damage = document.getElementById('it-damage').value.trim() || '1d6';
        item.crit = document.getElementById('it-crit').value.trim() || '20/x2';
      } else if (type === 'Proteção') {
        item.defense = parseInt(document.getElementById('it-defense').value) || 0;
        item.equipped = document.getElementById('it-equipped').checked;
      }

      state.inventory.push(item);
      document.getElementById('it-name').value = '';
      document.getElementById('it-desc').value = '';
      closeModal('modal-item');
      saveState();
      refreshAll();
    }

    function toggleEquipItem(id) {
      const item = state.inventory.find(i => i.id === id);
      if (item) {
        item.equipped = !item.equipped;
        saveState();
        refreshAll();
      }
    }

    function deleteItem(id) {
      state.inventory = state.inventory.filter(i => i.id !== id);
      saveState();
      refreshAll();
    }

    let currentModItemId = null;
    function openItemModsModal(itemId) {
      currentModItemId = itemId;
      renderItemModsModal();
      openModal('modal-item-mods');
    }

    function renderItemModsModal() {
      const item = state.inventory.find(i => i.id === currentModItemId);
      if (!item) return;

      if (!Array.isArray(item.mods)) item.mods = [];
      const eff = computeItemEffectiveStats(item);

      document.getElementById('mod-modal-item-name').textContent = item.name;

      let statSnippet = '';
      if (item.type === 'Arma') {
        statSnippet = `<span>Dano: <strong class="text-white">${eff.effectiveDamage}</strong></span> • <span>Crítico: <strong class="text-white">${eff.effectiveCrit}</strong></span>${eff.attackBonus ? ` • <span class="text-emerald-400">+${eff.attackBonus} Ataque</span>` : ''}`;
      } else if (item.type === 'Proteção') {
        statSnippet = `<span>Defesa: <strong class="text-sky-300">+${eff.effectiveDefense}</strong></span>`;
      }

      document.getElementById('mod-modal-summary').innerHTML = `
        <div class="flex items-center gap-3 flex-wrap">
          <span>Categoria: <strong class="text-zinc-400">${item.cat}</strong> → <strong class="accent-text">${eff.effectiveCat}</strong></span>
          <span>Espaços: <strong class="text-white">${eff.effectiveSpaces}</strong></span>
          ${statSnippet}
        </div>
        <span class="text-zinc-400">${item.mods.length} modificação(ões)</span>
      `;

      const relevantMods = ITEM_MODIFICATIONS_DB.filter(m =>
        m.target === item.type || (item.type !== 'Arma' && item.type !== 'Proteção' && m.target === 'Geral')
      );
      const displayMods = relevantMods.length > 0 ? relevantMods : ITEM_MODIFICATIONS_DB;

      document.getElementById('mod-modal-list').innerHTML = displayMods.map(mod => {
        const isApplied = item.mods.includes(mod.id);
        return `
          <div onclick="toggleItemModification('${mod.id}')"
            class="cursor-pointer rounded-xl p-3 border transition flex flex-col justify-between gap-1.5 ${isApplied ? 'accent-border accent-soft-bg' : 'bg-void border-borderSubtle hover:border-zinc-600'}">
            <div class="flex items-center justify-between gap-2">
              <span class="font-semibold text-sm ${isApplied ? 'text-white' : 'text-zinc-200'}">${mod.name}</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded ${isApplied ? 'accent-bg text-white font-bold' : 'bg-elevated text-zinc-400'}">
                ${isApplied ? '✓ Aplicado (+I)' : '+ Aplicar (+I)'}
              </span>
            </div>
            <p class="text-xs text-zinc-400 leading-relaxed">${mod.desc}</p>
          </div>
        `;
      }).join('');
    }

    function toggleItemModification(modId) {
      const item = state.inventory.find(i => i.id === currentModItemId);
      if (!item) return;
      if (!Array.isArray(item.mods)) item.mods = [];

      const idx = item.mods.indexOf(modId);
      if (idx >= 0) {
        item.mods.splice(idx, 1);
      } else {
        item.mods.push(modId);
      }

      saveState();
      renderItemModsModal();
      refreshAll();
    }

    // ==================== IMPORT / EXPORT / RESET ====================
    function exportSingleAgentById(agentId) {
      const target = rosterData.agents.find(a => a.id === agentId);
      if (!target) return;
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(target, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute("href", dataStr);
      const safeName = (target.name || 'agente_ordem').toLowerCase().replace(/[^a-z0-9]/g, '_');
      dlAnchor.setAttribute("download", `${safeName}_nex${target.nex}.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('Exportação Concluída', `Ficha de ${target.name} baixada em JSON.`, 'JSON');
    }

    function exportJSON() {
      saveState();
      exportSingleAgentById(state.id);
    }

    function exportAllAgentsJSON() {
      const payload = {
        type: 'ordo_realitas_roster_backup',
        exportedAt: new Date().toISOString(),
        agents: rosterData.agents
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute("href", dataStr);
      dlAnchor.setAttribute("download", `arquivo_ordo_realitas_${rosterData.agents.length}_agentes.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
      showToast('Backup Geral Concluído', `${rosterData.agents.length} ficha(s) exportada(s) em um único arquivo.`, '📦');
    }

    function importJSON(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const imported = JSON.parse(e.target.result);

          // Multi-agent roster backup file
          if (imported && Array.isArray(imported.agents)) {
            let count = 0;
            imported.agents.forEach(ag => {
              const cleanAg = getDefaultState({
                ...ag,
                id: generateAgentId(),
                updatedAt: Date.now()
              });
              rosterData.agents.unshift(cleanAg);
              count++;
            });
            localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));
            if (rosterData.view === 'hub') renderHub();
            else refreshAll();
            showToast('Backup Importado', `${count} agente(s) adicionado(s) ao Arquivo sem sobrescrever existentes.`, 'OK');
          } else {
            // Single agent JSON file
            const importedAgent = getDefaultState({
              ...imported,
              id: generateAgentId(),
              updatedAt: Date.now()
            });
            rosterData.agents.unshift(importedAgent);
            rosterData.activeId = importedAgent.id;
            state = importedAgent;
            localStorage.setItem(ROSTER_STORAGE_KEY, JSON.stringify(rosterData));

            if (rosterData.view === 'hub') {
              renderHub();
            } else {
              refreshAll();
            }
            showToast('Ficha Importada', `Agente "${importedAgent.name || 'Sem Nome'}" adicionado ao arquivo.`, 'OK');
          }
        } catch (err) {
          showToast('Erro na Importação', 'Arquivo JSON inválido.', 'ERRO');
        }
      };
      reader.readAsText(file);
      event.target.value = '';
    }

    let resetConfirmPending = false;
    function confirmReset() {
      if (!resetConfirmPending) {
        resetConfirmPending = true;
        showToast('Confirmar Reset?', 'Clique novamente em "Resetar" em até 4 segundos para zerar esta ficha.', '!');
        setTimeout(() => { resetConfirmPending = false; }, 4000);
      } else {
        resetConfirmPending = false;
        const keepId = state.id;
        const keepName = state.name;
        state = getDefaultState({ id: keepId, name: keepName });
        saveState();
        refreshAll();
        showToast('Ficha Resetada', 'Todos os campos desta ficha voltaram aos valores iniciais.', '5%');
      }
    }
// ==================== MOBILE-FIRST HELPERS ====================
    function toggleMobileHeaderFields() {
      const fields = document.getElementById('header-identity-fields');
      const btn = document.getElementById('btn-toggle-mob-header');
      if (!fields || !btn) return;
      const isHidden = fields.classList.contains('hidden');
      fields.classList.toggle('hidden', !isHidden);
      fields.classList.toggle('grid', isHidden);
      btn.textContent = isHidden ? 'Fechar ▲' : 'Editar ▾';
    }

    // Estende applyViewVisibility para mostrar/esconder a barra inferior mobile
    const _origApplyViewVisibility = applyViewVisibility;
    applyViewVisibility = function () {
      _origApplyViewVisibility();
      const mobNav = document.getElementById('mobile-bottom-nav');
      if (mobNav) {
        mobNav.classList.toggle('hidden', rosterData.view === 'hub');
      }
    };

    // Estende switchTab para sincronizar o estado ativo nos botões inferiores
    const _origSwitchTab = switchTab;
    switchTab = function (tabName) {
      _origSwitchTab(tabName);
      document.querySelectorAll('.mob-tab-btn').forEach(btn => {
        btn.classList.remove('accent-text', 'font-semibold', 'accent-soft-bg');
        btn.classList.add('text-zinc-400');
      });
      const activeMobBtn = document.getElementById(`mob-tab-btn-${tabName}`);
      if (activeMobBtn) {
        activeMobBtn.classList.add('accent-text', 'font-semibold', 'accent-soft-bg');
        activeMobBtn.classList.remove('text-zinc-400');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Estende renderHeader para atualizar o resumo compacto no topo do celular
    const _origRenderHeader = renderHeader;
    renderHeader = function () {
      _origRenderHeader();
      const mName = document.getElementById('mob-header-name');
      const mNex = document.getElementById('mob-header-nex');
      const mSub = document.getElementById('mob-header-sub');
      if (mName) mName.textContent = state.name || 'Agente Sem Nome';
      if (mNex) mNex.textContent = `NEX ${state.nex}%`;
      if (mSub) mSub.textContent = `${state.charClass} • ${state.path} • ${state.origin}`;
    };
    // ==================== SITE THEME SYSTEM ====================
    const SITE_THEME_KEY = 'op_site_theme_v1';

    function setSiteTheme(themeName) {
  const validThemes = ['dark', 'light', 'dossier', 'cris', 'coquette'];
  const chosen = validThemes.includes(themeName) ? themeName : 'dark';

  document.documentElement.setAttribute('data-theme', chosen);

  if (chosen === 'light' || chosen === 'dossier' || chosen === 'coquette') {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }

  localStorage.setItem(SITE_THEME_KEY, chosen);

  const selectEl = document.getElementById('site-theme-select');
  if (selectEl) selectEl.value = chosen;

  if (typeof applyTheme === 'function') applyTheme();
}

    function initSiteTheme() {
      const saved = localStorage.getItem(SITE_THEME_KEY);
      if (saved) {
        setSiteTheme(saved);
      } else {
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        setSiteTheme(prefersLight ? 'light' : 'dark');
      }
    }
    // ==================== GUIDED CHARACTER CREATION WIZARD ====================
    const WIZARD_CLASS_GUIDES = {
      'Combatente': {
        icon: '⚔️',
        tagline: 'Linha de frente, resistência e dano pesado.',
        summary: 'Treinado para lutar com todo tipo de armas, e com a força e a coragem para encarar os perigos de frente. Prefere abordagens diretas, atirando primeiro e perguntando depois.',
        recommendedAttrs: { AGI: 2, FOR: 3, INT: 1, PRE: 1, VIG: 2 },
        recommendedSkills: ['Iniciativa', 'Atletismo'],
        starterKit: [
          { name: 'Machado', type: 'Arma', cat: 'I', spaces: 1, skill: 'Luta', damage: '1d8', crit: 'x3', equipped: true, desc: 'Arma tática de alto impacto.' },
          { name: 'Pistola', type: 'Arma', cat: 'I', spaces: 1, skill: 'Pontaria', damage: '1d12', crit: '18/x2', equipped: true, desc: 'Arma de fogo leve.' },
          { name: 'Proteção Leve', type: 'Proteção', cat: 'I', spaces: 2, defense: 5, equipped: true, desc: 'Colete balístico (+5 Defesa).' },
          { name: 'Balas Curtas (Pacote)', type: 'Munição/Explosivo', cat: '0', spaces: 1, desc: 'Munição para pistola.' }
        ]
      },
      'Especialista': {
        icon: '🕵️',
        tagline: 'Investigação, perícias, furtividade e suporte.',
        summary: 'Um agente que confia mais em esperteza do que em força bruta. Vale-se de conhecimento técnico, raciocínio rápido ou lábia para resolver mistérios e enfrentar o paranormal.',
        recommendedAttrs: { AGI: 3, FOR: 1, INT: 3, PRE: 2, VIG: 1 },
        recommendedSkills: ['Investigação', 'Percepção', 'Pontaria', 'Furtividade', 'Reflexos', 'Tecnologia', 'Medicina', 'Intuição', 'Crime', 'Acrobacia'],
        starterKit: [
          { name: 'Revólver', type: 'Arma', cat: 'I', spaces: 1, skill: 'Pontaria', damage: '2d6', crit: '19/x3', equipped: true, desc: 'Arma confiável de curto alcance.' },
          { name: 'Faca', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d4', crit: '19/x2', equipped: true, desc: 'Lâmina tática discreta.' },
          { name: 'Proteção Leve', type: 'Proteção', cat: 'I', spaces: 2, defense: 5, equipped: true, desc: 'Jaqueta reforçada (+5 Defesa).' },
          { name: 'Kit de Perícia', type: 'Geral', cat: '0', spaces: 1, desc: 'Ferramentas de investigação e campo.' },
          { name: 'Balas Curtas (Pacote)', type: 'Munição/Explosivo', cat: '0', spaces: 1, desc: 'Munição para revólver.' }
        ]
      },
      'Ocultista': {
        icon: '🔮',
        tagline: 'Rituais paranormais, conhecimento proibido e controle.',
        summary: 'Estudioso que busca compreender e dominar os mistérios paranormais para combater o próprio Outro Lado, possuindo talento para se conectar com os elementos. Mas lembre-se: O Outro Lado tem seu preço ',
        recommendedAttrs: { AGI: 1, FOR: 1, INT: 3, PRE: 3, VIG: 2 },
        recommendedSkills: ['Investigação', 'Percepção', 'Iniciativa', 'Intuição', 'Religião', 'Atualidades'],
        starterKit: [
          { name: 'Punhal', type: 'Arma', cat: '0', spaces: 1, skill: 'Luta', damage: '1d4', crit: 'x3', equipped: true, desc: 'Punhal cerimonial.' },
          { name: 'Componentes Ritualísticos (Morte)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Permite conjurar rituais de Morte.' },
          { name: 'Componentes Ritualísticos (Energia)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Permite conjurar rituais de Energia.' },
          { name: 'Componentes Ritualísticos (Sangue)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Permite conjurar rituais de Sangue.' },
          { name: 'Componentes Ritualísticos (Conhecimento)', type: 'Paranormal', cat: '0', spaces: 1, desc: 'Permite conjurar rituais de Conhecimento.' }
        ]
      }
    };

    let wizState = {
      step: 1,
      charClass: 'Combatente',
      origin: 'Policial',
      attributes: { AGI: 2, FOR: 3, INT: 1, PRE: 1, VIG: 2 },
      combatenteAttack: 'Luta',
      combatenteDefense: 'Fortitude',
      selectedSkills: [],
      selectedRituals: ['Decadência', 'Cicatrização', 'Eletrocussão'],
      name: '',
      player: '',
      notes: '',
      applyStarterKit: true
    };

    function openGuidedWizardModal() {
      wizState = {
        step: 1,
        charClass: 'Combatente',
        origin: 'Policial',
        attributes: { ...WIZARD_CLASS_GUIDES['Combatente'].recommendedAttrs },
        combatenteAttack: 'Luta',
        combatenteDefense: 'Fortitude',
        selectedSkills: [],
        selectedRituals: ['Decadência', 'Cicatrização', 'Eletrocussão'],
        name: '',
        player: '',
        notes: '',
        applyStarterKit: true
      };
      autoFillWizardSkills();
      renderGuidedWizard();
      openModal('modal-guided-wizard');
    }

    function getWizardFreeSkillQuota() {
      const intVal = wizState.attributes.INT;
      const base = wizState.charClass === 'Especialista' ? 7 : wizState.charClass === 'Ocultista' ? 3 : 1;
      const originBonus = (wizState.origin === 'Personalizada' || wizState.origin === 'Amnésico') ? 2 : 0;
      return Math.max(0, base + intVal + originBonus);
    }

    function getWizardLockedSkills() {
      const originObj = ORIGINS_DB.find(o => o.name === wizState.origin);
      const list = originObj ? [...originObj.skills] : [];
      if (wizState.charClass === 'Combatente') {
        list.push(wizState.combatenteAttack, wizState.combatenteDefense);
      } else if (wizState.charClass === 'Ocultista') {
        list.push('Ocultismo', 'Vontade');
      }
      return Array.from(new Set(list));
    }

    function autoFillWizardSkills() {
      const locked = getWizardLockedSkills();
      const quota = getWizardFreeSkillQuota();
      const guideList = WIZARD_CLASS_GUIDES[wizState.charClass].recommendedSkills;
      const picked = [];

      for (const sk of guideList) {
        if (!locked.includes(sk) && picked.length < quota) picked.push(sk);
      }
      for (const s of OFFICIAL_SKILLS) {
        if (!locked.includes(s.name) && !picked.includes(s.name) && picked.length < quota) {
          picked.push(s.name);
        }
      }
      wizState.selectedSkills = picked;
    }

    function wizSelectClass(cls) {
      wizState.charClass = cls;
      wizState.attributes = { ...WIZARD_CLASS_GUIDES[cls].recommendedAttrs };
      autoFillWizardSkills();
      renderGuidedWizard();
    }

    function wizSelectOrigin(originName) {
      wizState.origin = originName;
      autoFillWizardSkills();
      renderGuidedWizard();
    }

    function wizAdjustAttr(key, delta) {
      const cur = wizState.attributes[key];
      const next = cur + delta;
      const totalUsed = Object.values(wizState.attributes).reduce((a, b) => a + b, 0) - 5;
      if (next < 0 || next > 3) return;
      if (delta > 0 && totalUsed >= 4) return;
      wizState.attributes[key] = next;
      autoFillWizardSkills();
      renderGuidedWizard();
    }

    function wizToggleSkill(skillName) {
      const locked = getWizardLockedSkills();
      if (locked.includes(skillName)) return;
      const quota = getWizardFreeSkillQuota();
      const idx = wizState.selectedSkills.indexOf(skillName);
      if (idx >= 0) {
        wizState.selectedSkills.splice(idx, 1);
      } else if (wizState.selectedSkills.length < quota) {
        wizState.selectedSkills.push(skillName);
      } else {
        showToast('Limite Atingido', `Você já escolheu todas as ${quota} perícias livres permitidas.`, '!');
        return;
      }
      renderGuidedWizard();
    }

    function wizToggleRitual(ritualName) {
      const idx = wizState.selectedRituals.indexOf(ritualName);
      if (idx >= 0) {
        wizState.selectedRituals.splice(idx, 1);
      } else if (wizState.selectedRituals.length < 3) {
        wizState.selectedRituals.push(ritualName);
      } else {
        showToast('Máximo de 3 Rituais', 'Ocultistas iniciam em NEX 5% com 3 rituais de 1º círculo.', '!');
        return;
      }
      renderGuidedWizard();
    }

    function wizardPrevStep() {
      if (wizState.step > 1) {
        wizState.step--;
        renderGuidedWizard();
      }
    }

    function wizardNextStep() {
      if (wizState.step < 5) {
        wizState.step++;
        renderGuidedWizard();
      } else {
        finalizeGuidedWizard();
      }
    }

    function renderGuidedWizard() {
      const stepsMeta = [
        { num: 1, label: '1. Classe', sub: 'Passo 1 de 5 • Escolha como seu agente atua nas missões' },
        { num: 2, label: '2. Passado', sub: 'Passo 2 de 5 • O que seu personagem fazia antes da Ordem?' },
        { num: 3, label: '3. Atributos', sub: 'Passo 3 de 5 • Distribua seus 4 pontos iniciais (0 a 3)' },
        { num: 4, label: '4. Perícias', sub: 'Passo 4 de 5 • Escolha em quais áreas você é treinado (+5)' },
        { num: 5, label: '5. Finalizar', sub: 'Passo 5 de 5 • Nome, kit inicial e revisão da ficha' }
      ];

      const curMeta = stepsMeta[wizState.step - 1];
      document.getElementById('wiz-step-subtitle').textContent = curMeta.sub;
      document.getElementById('wiz-live-preview-text').textContent = `${wizState.charClass} • ${wizState.origin} • NEX 5%`;

      document.getElementById('wiz-stepper-bar').innerHTML = stepsMeta.map(s => `
        <button onclick="wizState.step=${s.num}; renderGuidedWizard();"
          class="py-1.5 px-2 rounded-lg text-[11px] font-mono font-semibold text-center truncate border transition ${
            wizState.step === s.num
              ? 'accent-bg text-white accent-border'
              : wizState.step > s.num
                ? 'bg-void text-emerald-400 border-emerald-500/30'
                : 'bg-void/50 text-zinc-500 border-borderSubtle'
          }">
          ${s.label}
        </button>
      `).join('');

      document.getElementById('wiz-btn-prev').classList.toggle('invisible', wizState.step === 1);
      const nextBtn = document.getElementById('wiz-btn-next');
      nextBtn.textContent = wizState.step === 5 ? '✓ Criar Agente e Abrir Ficha' : 'Próximo Passo →';

      const body = document.getElementById('wiz-body');

      // STEP 1: CLASSE
      if (wizState.step === 1) {
        body.innerHTML = `
          <div class="bg-void border border-borderSubtle rounded-xl p-3.5 text-xs text-zinc-300">
            💡 <strong>Dica para iniciantes:</strong> Não se preocupe com números agora. Escolha o estilo de jogo que mais combina com você — o sistema ajustará sua vida, sanidade e atributos recomendados automaticamente.
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            ${Object.entries(WIZARD_CLASS_GUIDES).map(([clsName, info]) => {
              const selected = wizState.charClass === clsName;
              const statsText = clsName === 'Combatente' ? 'PV Alto (20+VIG) • Poucas Perícias'
                : clsName === 'Especialista' ? 'PV Médio (16+VIG) • Muitas Perícias'
                : 'SAN Alta (20) • Lança Rituais';
              return `
                <div onclick="wizSelectClass('${clsName}')"
                  class="cursor-pointer rounded-2xl p-5 border-2 transition flex flex-col justify-between gap-4 ${
                    selected ? 'accent-border accent-soft-bg shadow-lg' : 'bg-void border-borderSubtle hover:border-zinc-600'
                  }">
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-2xl">${info.icon}</span>
                      ${selected ? '<span class="text-[10px] font-mono px-2 py-0.5 rounded accent-bg text-white font-bold">Selecionada</span>' : ''}
                    </div>
                    <h4 class="text-lg font-bold text-white">${clsName}</h4>
                    <p class="text-xs font-medium accent-text">${info.tagline}</p>
                    <p class="text-xs text-zinc-300 leading-relaxed pt-1">${info.summary}</p>
                  </div>
                  <div class="pt-2 border-t border-borderSubtle/70 text-[11px] font-mono text-zinc-400">
                    ${statsText}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // STEP 2: ORIGEM
      if (wizState.step === 2) {
        const curOrigin = ORIGINS_DB.find(o => o.name === wizState.origin) || ORIGINS_DB[0];
        body.innerHTML = `
          <div class="bg-void border border-borderSubtle rounded-xl p-3.5 text-xs text-zinc-300">
            💡 <strong>O que é a Origem?</strong> É a profissão ou história de vida do seu personagem antes de descobrir o paranormal. Ela garante <strong>2 perícias treinadas (+5)</strong> e um <strong>poder exclusivo</strong>.
          </div>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[340px] overflow-y-auto pr-1">
              ${ORIGINS_DB.map(o => {
                const active = wizState.origin === o.name;
                return `
                  <button onclick="wizSelectOrigin('${o.name}')"
                    class="p-2.5 rounded-xl border text-left transition ${
                      active ? 'accent-border accent-soft-bg text-white font-semibold' : 'bg-void border-borderSubtle text-zinc-300 hover:border-zinc-600'
                    }">
                    <div class="text-xs truncate">${o.name}</div>
                    <div class="text-[10px] font-mono text-zinc-400 truncate mt-0.5">${o.skills.length ? o.skills.join(', ') : '2 Livres'}</div>
                  </button>
                `;
              }).join('')}
            </div>
            <div class="md:col-span-5 bg-void border accent-border rounded-2xl p-4 flex flex-col justify-between gap-3">
              <div class="space-y-2">
                <span class="text-[10px] font-mono uppercase accent-text font-bold">Origem Selecionada</span>
                <h4 class="text-lg font-bold text-white">${curOrigin.name}</h4>
                <div class="flex flex-wrap gap-1.5">
                  ${(curOrigin.skills.length ? curOrigin.skills : ['2 Perícias à Escolha']).map(s =>
                    `<span class="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-borderSubtle text-zinc-200">✓ ${s}</span>`
                  ).join('')}
                </div>
                <div class="pt-2 border-t border-borderSubtle">
                  <span class="block text-xs font-bold text-amber-300">${curOrigin.power}</span>
                  <p class="text-xs text-zinc-300 leading-relaxed mt-1">${curOrigin.desc}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      }

      // STEP 3: ATRIBUTOS
      if (wizState.step === 3) {
        const spent = Object.values(wizState.attributes).reduce((a, b) => a + b, 0) - 5;
        const remaining = 4 - spent;
        const attrDescriptions = {
          AGI: 'Define sua Defesa, reflexos, furtividade e pontaria (armas de fogo).',
          FOR: 'Define quanto peso você carrega na mochila e ataques corpo a corpo (Luta).',
          INT: 'Define quantas perícias extras você aprende e testes de investigação/tecnologia.',
          PRE: 'Define seus Pontos de Esforço (PE), resistência mental e testes sociais.',
          VIG: 'Define seus Pontos de Vida (PV) máximos e resistência física (Fortitude).'
        };

        body.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2 bg-void border border-borderSubtle rounded-xl p-3.5">
            <p class="text-xs text-zinc-300">
              Todos começam com <strong>1</strong> em cada atributo. Você tem <strong>4 pontos</strong> para distribuir (máximo 3 por atributo, ou reduza um atributo para 0 para ganhar +1 ponto).
            </p>
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-xs font-mono px-3 py-1 rounded-full border ${
                remaining === 0 ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400' : 'accent-border accent-soft-bg accent-text'
              }">
                Pontos Restantes: <strong>${remaining}</strong>
              </span>
              <button onclick="wizState.attributes={...WIZARD_CLASS_GUIDES[wizState.charClass].recommendedAttrs}; autoFillWizardSkills(); renderGuidedWizard();"
                class="px-2.5 py-1 rounded-lg bg-elevated hover:bg-zinc-800 border border-borderSubtle text-[11px] text-zinc-200">
                Restaurar Sugestão
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
            ${ATTRIBUTE_INFO.map(a => {
              const val = wizState.attributes[a.key];
              return `
                <div class="bg-void border border-borderSubtle rounded-2xl p-4 flex flex-col justify-between gap-3 text-center">
                  <div>
                    <span class="text-xs font-bold uppercase tracking-wider accent-text">${a.name}</span>
                    <div class="text-3xl font-mono font-bold text-white my-2">${val}</div>
                    <div class="flex items-center justify-center gap-2">
                      <button onclick="wizAdjustAttr('${a.key}', -1)" ${val <= 0 ? 'disabled' : ''}
                        class="w-9 h-8 rounded-lg bg-elevated hover:bg-zinc-700 disabled:opacity-30 font-mono font-bold text-white">-</button>
                      <button onclick="wizAdjustAttr('${a.key}', 1)" ${val >= 3 || remaining <= 0 ? 'disabled' : ''}
                        class="w-9 h-8 rounded-lg bg-elevated hover:bg-zinc-700 disabled:opacity-30 font-mono font-bold text-white">+</button>
                    </div>
                  </div>
                  <p class="text-[11px] text-zinc-400 leading-snug text-left border-t border-borderSubtle/70 pt-2">${attrDescriptions[a.key]}</p>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }

      // STEP 4: PERÍCIAS (& RITUAIS SE OCULTISTA)
      if (wizState.step === 4) {
        const locked = getWizardLockedSkills();
        const quota = getWizardFreeSkillQuota();
        const firstCircleRituals = RITUALS_COMPENDIUM.filter(r => r.circle === 1);

        body.innerHTML = `
          <div class="bg-void border border-borderSubtle rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span class="text-zinc-300">
              Perícias marcadas com 🔒 já vêm da sua Origem/Classe. Escolha mais <strong>${quota}</strong> perícias livres (já pré-selecionamos boas opções para você!):
            </span>
            <span class="font-mono px-2.5 py-1 rounded-lg accent-soft-bg accent-text border accent-border">
              Escolhidas: <strong>${wizState.selectedSkills.length}</strong> / ${quota}
            </span>
          </div>

          ${wizState.charClass === 'Combatente' ? `
            <div class="bg-void border border-borderSubtle rounded-xl p-3 flex flex-wrap items-center gap-3 text-xs">
              <span class="text-zinc-400">Foco do Combatente:</span>
              <div class="inline-flex rounded-lg bg-surface p-0.5 border border-borderSubtle">
                <button onclick="wizState.combatenteAttack='Luta'; autoFillWizardSkills(); renderGuidedWizard();" class="px-2.5 py-1 rounded ${wizState.combatenteAttack==='Luta'?'accent-bg text-white':'text-zinc-400'}">Corpo a Corpo (Luta)</button>
                <button onclick="wizState.combatenteAttack='Pontaria'; autoFillWizardSkills(); renderGuidedWizard();" class="px-2.5 py-1 rounded ${wizState.combatenteAttack==='Pontaria'?'accent-bg text-white':'text-zinc-400'}">Armas de Fogo (Pontaria)</button>
              </div>
              <div class="inline-flex rounded-lg bg-surface p-0.5 border border-borderSubtle">
                <button onclick="wizState.combatenteDefense='Fortitude'; autoFillWizardSkills(); renderGuidedWizard();" class="px-2.5 py-1 rounded ${wizState.combatenteDefense==='Fortitude'?'accent-bg text-white':'text-zinc-400'}">Resistência (Fortitude)</button>
                <button onclick="wizState.combatenteDefense='Reflexos'; autoFillWizardSkills(); renderGuidedWizard();" class="px-2.5 py-1 rounded ${wizState.combatenteDefense==='Reflexos'?'accent-bg text-white':'text-zinc-400'}">Esquiva (Reflexos)</button>
              </div>
            </div>
          ` : ''}

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-[240px] overflow-y-auto pr-1">
            ${OFFICIAL_SKILLS.map(s => {
              const isLocked = locked.includes(s.name);
              const isPicked = wizState.selectedSkills.includes(s.name);
              const active = isLocked || isPicked;
              return `
                <button onclick="wizToggleSkill('${s.name}')"
                  class="px-3 py-2 rounded-xl border text-left text-xs flex items-center justify-between gap-1 transition ${
                    isLocked
                      ? 'bg-surface border-emerald-500/40 text-emerald-300 cursor-default'
                      : isPicked
                        ? 'accent-soft-bg accent-border text-white font-semibold'
                        : 'bg-void border-borderSubtle text-zinc-400 hover:border-zinc-600'
                  }">
                  <span class="truncate">${s.name}</span>
                  <span class="font-mono text-[10px] shrink-0">${isLocked ? '🔒' : active ? '✓ +5' : s.attr}</span>
                </button>
              `;
            }).join('')}
          </div>

          ${wizState.charClass === 'Ocultista' ? `
            <div class="pt-2 border-t border-borderSubtle space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="font-bold accent-text">🔮 Grimório Inicial do Ocultista (Escolha 3 Rituais de 1º Círculo)</span>
                <span class="font-mono text-zinc-300">${wizState.selectedRituals.length} / 3</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 max-h-[160px] overflow-y-auto pr-1">
                ${firstCircleRituals.map(r => {
                  const chosen = wizState.selectedRituals.includes(r.name);
                  return `
                    <button onclick="wizToggleRitual('${r.name}')"
                      class="p-2.5 rounded-xl border text-left transition ${
                        chosen ? 'accent-border accent-soft-bg text-white' : 'bg-void border-borderSubtle text-zinc-400 hover:border-zinc-600'
                      }">
                      <div class="flex items-center justify-between text-xs font-semibold">
                        <span class="truncate">${r.name}</span>
                        <span class="text-[10px] font-mono accent-text">${r.element}</span>
                      </div>
                      <p class="text-[10px] text-zinc-400 line-clamp-2 mt-1">${r.desc}</p>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          ` : ''}
        `;
      }

      // STEP 5: IDENTIDADE, KIT INICIAL & RESUMO
      if (wizState.step === 5) {
        const tempAg = buildAgentFromWizard();
        const snap = computeAgentSnapshotStats(tempAg);
        const allTrained = Array.from(new Set([...getWizardLockedSkills(), ...wizState.selectedSkills]));

        body.innerHTML = `
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div class="md:col-span-6 space-y-3 text-xs">
              <div>
                <label class="block text-zinc-400 mb-1">Nome do Agente *</label>
                <input type="text" id="wiz-input-name" value="${wizState.name}" oninput="wizState.name=this.value" placeholder="Ex: Arthur Cervero, Liz Webber..."
                  class="w-full bg-void border border-borderSubtle focus:border-zinc-500 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white outline-none" />
              </div>
              <div>
                <label class="block text-zinc-400 mb-1">Seu Nome (Jogador)</label>
                <input type="text" id="wiz-input-player" value="${wizState.player}" oninput="wizState.player=this.value" placeholder="Opcional"
                  class="w-full bg-void border border-borderSubtle rounded-xl px-3.5 py-2 text-white outline-none" />
              </div>
              <div>
                <label class="block text-zinc-400 mb-1">Conceito / História Rápida</label>
                <textarea rows="3" oninput="wizState.notes=this.value" placeholder="Ex: Ex-detetive que viu algo impossível durante uma investigação..."
                  class="w-full bg-void border border-borderSubtle rounded-xl p-3 text-zinc-200 outline-none resize-none">${wizState.notes}</textarea>
              </div>
              <label class="flex items-center gap-2.5 bg-void border border-borderSubtle rounded-xl p-3 cursor-pointer">
                <input type="checkbox" ${wizState.applyStarterKit ? 'checked' : ''} onchange="wizState.applyStarterKit=this.checked; renderGuidedWizard();" />
                <div>
                  <span class="font-semibold text-white block">Incluir Kit Inicial Recomendado (Patente Recruta)</span>
                  <span class="text-[11px] text-zinc-400">Adiciona automaticamente armas, proteção e munição/componentes ideais para ${wizState.charClass}.</span>
                </div>
              </label>
            </div>

            <div class="md:col-span-6 bg-void border accent-border rounded-2xl p-4 space-y-3">
              <span class="text-[10px] font-mono uppercase accent-text font-bold">Resumo Automático da Ficha (NEX 5%)</span>
              <div class="grid grid-cols-4 gap-2 text-center font-mono">
                <div class="bg-surface rounded-xl p-2 border border-borderSubtle">
                  <span class="block text-[10px] text-rose-400">PV</span>
                  <strong class="text-base text-white">${snap.maxPv}</strong>
                </div>
                <div class="bg-surface rounded-xl p-2 border border-borderSubtle">
                  <span class="block text-[10px] text-amber-300">PE</span>
                  <strong class="text-base text-white">${snap.maxPe}</strong>
                </div>
                <div class="bg-surface rounded-xl p-2 border border-borderSubtle">
                  <span class="block text-[10px] text-sky-300">SAN</span>
                  <strong class="text-base text-white">${snap.maxSan}</strong>
                </div>
                <div class="bg-surface rounded-xl p-2 border border-borderSubtle">
                  <span class="block text-[10px] text-zinc-400">Defesa</span>
                  <strong class="text-base text-white">${snap.defense}</strong>
                </div>
              </div>

              <div class="text-xs space-y-1.5">
                <div class="text-zinc-400">Classe & Origem: <strong class="text-white">${wizState.charClass} • ${wizState.origin}</strong></div>
                <div class="text-zinc-400 font-mono text-[11px]">
                  AGI ${wizState.attributes.AGI} | FOR ${wizState.attributes.FOR} | INT ${wizState.attributes.INT} | PRE ${wizState.attributes.PRE} | VIG ${wizState.attributes.VIG}
                </div>
                <div class="pt-1">
                  <span class="block text-[11px] text-zinc-400 mb-1">Perícias Treinadas (+5):</span>
                  <p class="text-[11px] font-mono text-zinc-200 leading-relaxed">${allTrained.join(', ')}</p>
                </div>
                ${wizState.charClass === 'Ocultista' ? `
                  <div class="pt-1">
                    <span class="block text-[11px] text-zinc-400 mb-1">Rituais Iniciais:</span>
                    <p class="text-[11px] font-mono accent-text">${wizState.selectedRituals.join(', ')}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        `;
      }
    }

    function buildAgentFromWizard() {
      const defaultPath = Object.keys(CLASSES_DB[wizState.charClass].paths)[0];
      const ag = getDefaultState({
        name: wizState.name.trim() || 'Agente Recruta',
        player: wizState.player.trim(),
        origin: wizState.origin,
        charClass: wizState.charClass,
        path: defaultPath,
        attributes: { ...wizState.attributes },
        combatenteAttackSkill: wizState.combatenteAttack,
        combatenteDefenseSkill: wizState.combatenteDefense,
        notes: wizState.notes.trim(),
        proficiencies: wizState.charClass === 'Combatente'
          ? 'Armas Simples, Armas Táticas, Proteções Leves'
          : wizState.charClass === 'Especialista'
            ? 'Armas Simples, Proteções Leves'
            : 'Armas Simples'
      });

      const allTrained = Array.from(new Set([...getWizardLockedSkills(), ...wizState.selectedSkills]));
      allTrained.forEach(s => {
        if (ag.skills[s]) ag.skills[s].rank = 5;
      });

      if (wizState.charClass === 'Especialista') {
        ag.peritoSkills = wizState.selectedSkills.filter(s => s !== 'Luta' && s !== 'Pontaria').slice(0, 2);
      }

      if (wizState.charClass === 'Ocultista') {
        ag.rituals = wizState.selectedRituals
          .map(rName => RITUALS_COMPENDIUM.find(r => r.name === rName))
          .filter(Boolean)
          .map((r, i) => ({ id: Date.now() + i, ...r, circle: String(r.circle) }));
      }

      if (wizState.applyStarterKit) {
        ag.inventory = WIZARD_CLASS_GUIDES[wizState.charClass].starterKit.map((it, i) => ({
          id: Date.now() + 100 + i,
          ...it
        }));
      }

      const snap = computeAgentSnapshotStats(ag);
      ag.currentPv = snap.maxPv;
      ag.currentPe = snap.maxPe;
      ag.currentSan = snap.maxSan;
      return ag;
    }

    function finalizeGuidedWizard() {
      const newAgent = buildAgentFromWizard();
      rosterData.agents.unshift(newAgent);
      closeModal('modal-guided-wizard');
      openAgentSheet(newAgent.id);
      showToast('Agente Criado!', `${newAgent.name} pronto para jogar com atributos, perícias e kit configurados.`, '✨');
    }
    // ==================== INITIALIZATION ====================
    window.addEventListener('DOMContentLoaded', () => {
      initSiteTheme();
      initStaticDropdowns();
      applyViewVisibility();
      if (rosterData.view === 'hub') {
        renderHub();
      } else {
        refreshAll();
      }
    });


(async () => {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
    const {
      getAuth,
      GoogleAuthProvider,
      signInWithPopup,
      signOut,
      onAuthStateChanged
    } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
    const {
      getFirestore,
      doc,
      setDoc,
      getDoc,
      onSnapshot,
      collection,
      deleteDoc,
      serverTimestamp
    } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
    const FIREBASE_CONFIG = {
      apiKey: "AIzaSyDKc688y119WyFzE5yGmxkaeYQBtLlI3FM",
      authDomain: "ordo-realitas-mesa.firebaseapp.com",
      projectId: "ordo-realitas-mesa",
      storageBucket: "ordo-realitas-mesa.firebasestorage.app",
      messagingSenderId: "1049343664232",
      appId: "1:1049343664232:web:00818b1ce7f88101931bdd"
    };

    let db = null;
    let auth = null;
    let currentUser = null;
    let firebaseReady = false;
    let localDemoMode = false;
    let firebaseStatusText = "Aguardando Login com Google";

    const SESSION_META_KEY = "op_multiplayer_session_v1";
    let sessionState = loadSessionMeta();
    let unsubscribeRoomAgents = null;
    let unsubscribeRoomRolls = null;
    let roomAgentsCache = [];
    let roomRollsCache = [];
    let inspectedAgentId = null;

    function loadSessionMeta() {
      try {
        const raw = localStorage.getItem(SESSION_META_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return { roomCode: null, role: null, gmSecret: null, playerAlias: "" };
    }

    function saveSessionMeta() {
      localStorage.setItem(SESSION_META_KEY, JSON.stringify(sessionState));
    }

    function withTimeout(promise, ms, timeoutMsg) {
      return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error(timeoutMsg)), ms))
      ]);
    }

    async function initFirebaseSync() {
      try {
        const app = initializeApp(FIREBASE_CONFIG);
        auth = getAuth(app);
        db = getFirestore(app);

        onAuthStateChanged(auth, (user) => {
          if (user) {
            currentUser = user;
            firebaseReady = true;
            localDemoMode = false;
            firebaseStatusText = `Conectado: ${user.displayName || user.email || "Agente"}`;
            updateConnectionBadge();
            renderSessionModalBody();

            if (sessionState.roomCode && sessionState.role) {
              connectToRoomListeners(sessionState.roomCode);
              if (sessionState.role === "player") {
                pushActiveAgentToRoom();
              }
            }
          } else {
            currentUser = null;
            firebaseReady = false;
            firebaseStatusText = "Desconectado — Entre com Google";
            renderSessionModalBody();
          }
        });
        return true;
      } catch (err) {
        console.error("[Ordo Sync] Falha ao iniciar Firebase:", err);
        firebaseStatusText = `Erro Firebase: ${err.code || err.message}`;
        renderSessionModalBody();
        return false;
      }
    }

    async function loginWithGoogle() {
      try {
        if (!auth) await initFirebaseSync();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        const result = await signInWithPopup(auth, provider);
        currentUser = result.user;
        firebaseReady = true;
        localDemoMode = false;
        firebaseStatusText = `Conectado: ${currentUser.displayName || currentUser.email}`;
        renderSessionModalBody();
        return true;
      } catch (err) {
        alertModalInfo(`Erro no Login Google (${err.code || "Auth"}): ${err.message}`);
        return false;
      }
    }

    async function logoutFirebaseUser() {
      if (!auth) return;
      leaveSession();
      await signOut(auth);
      currentUser = null;
      firebaseReady = false;
      firebaseStatusText = "Desconectado — Entre com Google";
      renderSessionModalBody();
    }

    // Intercepta o salvamento da ficha para enviar atualizações em tempo real
    const originalSetItem = localStorage.setItem.bind(localStorage);
    let syncDebounceTimer = null;

    localStorage.setItem = function (key, value) {
      originalSetItem(key, value);
      if (key === "op_agents_roster_v1" && sessionState.roomCode && sessionState.role === "player") {
        clearTimeout(syncDebounceTimer);
        syncDebounceTimer = setTimeout(() => {
          pushActiveAgentToRoom();
        }, 350);
      }
    };

    function setupRollObserver() {
      const toastContainer = document.getElementById("toast-container");
      if (!toastContainer) return;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && sessionState.roomCode) {
              const title = node.querySelector("span.text-xs.font-semibold")?.textContent?.trim() || "Rolagem";
              const detail = node.querySelector("p.text-xs.font-mono")?.textContent?.trim() || "";
              const resultEl = node.querySelector("div.text-2xl.font-mono");
              const result = resultEl?.textContent?.trim() || "";
              const isCrit = node.classList.contains("border-amber-400");
              const isFumble = node.classList.contains("border-rose-500");

              if (result) {
                broadcastRollToRoom({ title, detail, result, isCrit, isFumble });
              }
            }
          });
        });
      });

      observer.observe(toastContainer, { childList: true });
    }

    function getCurrentLocalAgent() {
      try {
        const raw = localStorage.getItem("op_agents_roster_v1");
        if (!raw) return null;
        const roster = JSON.parse(raw);
        return roster.agents.find((a) => a.id === roster.activeId) || roster.agents[0] || null;
      } catch (e) {
        return null;
      }
    }

    async function pushActiveAgentToRoom() {
      if (!sessionState.roomCode || sessionState.role !== "player" || !firebaseReady || !currentUser) return;
      const activeAgent = getCurrentLocalAgent();
      if (!activeAgent) return;

      const payload = {
        ...activeAgent,
        ownerUid: currentUser.uid,
        playerAlias: sessionState.playerAlias || activeAgent.player || currentUser.displayName || "Jogador",
        syncedAt: Date.now()
      };

      try {
        const agentDocRef = doc(db, "sessions", sessionState.roomCode, "agents", activeAgent.id);
        await setDoc(agentDocRef, payload);
      } catch (err) {
        console.error("[Ordo Sync] Erro ao enviar ficha:", err);
      }
    }

    async function broadcastRollToRoom(rollPayload) {
      if (!sessionState.roomCode || !firebaseReady || !currentUser) return;
      const activeAgent = getCurrentLocalAgent();
      const rollId = `roll_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const entry = {
        ...rollPayload,
        agentName: activeAgent?.name || "Agente",
        playerAlias: sessionState.playerAlias || activeAgent?.player || currentUser.displayName || "Jogador",
        timestamp: Date.now()
      };

      try {
        const rollRef = doc(db, "sessions", sessionState.roomCode, "rolls", rollId);
        await setDoc(rollRef, entry);
      } catch (err) {
        console.error("[Ordo Sync] Erro ao transmitir rolagem:", err);
      }
    }

    function generateRoomCode() {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let code = "";
      for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
      return code;
    }

    async function createSessionAsGM() {
      const btn = document.getElementById("btn-create-gm-room");
      if (btn && btn.disabled) return;
      if (btn) {
        btn.disabled = true;
        btn.textContent = "⏳ Criando sala...";
      }

      try {
        if (!firebaseReady) {
          const logged = await loginWithGoogle();
          if (!logged) return;
        }

        const campaignName = document.getElementById("sync-campaign-name")?.value.trim() || "Missão Ordo Realitas";
        const roomCode = generateRoomCode();
        const gmSecret = Math.random().toString(36).substring(2, 10);

        const roomRef = doc(db, "sessions", roomCode);
        await withTimeout(
          setDoc(roomRef, {
            roomCode,
            campaignName,
            gmUid: currentUser.uid,
            gmSecret,
            createdAt: serverTimestamp()
          }),
          7000,
          "Tempo esgotado ao gravar no Firestore. Verifique se o banco Firestore foi criado e se as Regras foram publicadas."
        );

        sessionState = { roomCode, role: "gm", gmSecret, playerAlias: "Mestre" };
        saveSessionMeta();
        updateConnectionBadge();
        connectToRoomListeners(roomCode);
        renderSessionModalBody();
      } catch (err) {
        alertModalInfo(`Não foi possível criar a sala: ${err.message || "Verifique as regras do Firestore."}`);
      } finally {
        const freshBtn = document.getElementById("btn-create-gm-room");
        if (freshBtn) {
          freshBtn.disabled = false;
          freshBtn.textContent = "Criar Sala como Mestre →";
        }
      }
    }

    async function joinSessionAsPlayer() {
      const btn = document.getElementById("btn-join-player-room");
      if (btn && btn.disabled) return;
      if (btn) {
        btn.disabled = true;
        btn.textContent = "⏳ Conectando...";
      }

      try {
        if (!firebaseReady) {
          const logged = await loginWithGoogle();
          if (!logged) return;
        }

        const codeInput = (document.getElementById("sync-join-code")?.value || "").trim().toUpperCase();
        const aliasInput = (document.getElementById("sync-player-alias")?.value || "").trim();

        if (codeInput.length < 4) {
          alertModalInfo("Digite um código de sala válido (ex: A7K9P2).");
          return;
        }

        const roomRef = doc(db, "sessions", codeInput);
        const snap = await withTimeout(getDoc(roomRef), 7000, "Tempo esgotado ao buscar a sala no Firestore.");
        if (!snap.exists()) {
          alertModalInfo(`Sala "${codeInput}" não encontrada. Verifique o código com o Mestre.`);
          return;
        }

        sessionState = {
          roomCode: codeInput,
          role: "player",
          gmSecret: null,
          playerAlias: aliasInput || currentUser.displayName || "Agente"
        };
        saveSessionMeta();
        updateConnectionBadge();
        connectToRoomListeners(codeInput);
        await pushActiveAgentToRoom();
        renderSessionModalBody();
      } catch (err) {
        alertModalInfo(`Erro ao entrar na sala: ${err.message || err}`);
      } finally {
        const freshBtn = document.getElementById("btn-join-player-room");
        if (freshBtn) {
          freshBtn.disabled = false;
          freshBtn.textContent = "Conectar Ficha Ativa →";
        }
      }
    }

    async function rejoinAsGM() {
      if (!firebaseReady) {
        const logged = await loginWithGoogle();
        if (!logged) return;
      }
      const codeInput = (document.getElementById("sync-join-code")?.value || "").trim().toUpperCase();
      if (!codeInput) {
        alertModalInfo("Digite o código da sala para entrar como Mestre.");
        return;
      }

      const roomRef = doc(db, "sessions", codeInput);
      const snap = await getDoc(roomRef);
      if (!snap.exists()) {
        alertModalInfo(`Sala "${codeInput}" não encontrada.`);
        return;
      }

      sessionState = {
        roomCode: codeInput,
        role: "gm",
        gmSecret: snap.data().gmSecret || "",
        playerAlias: "Mestre"
      };
      saveSessionMeta();
      updateConnectionBadge();
      connectToRoomListeners(codeInput);
      renderSessionModalBody();
    }

    function leaveSession() {
      if (unsubscribeRoomAgents) unsubscribeRoomAgents();
      if (unsubscribeRoomRolls) unsubscribeRoomRolls();
      unsubscribeRoomAgents = null;
      unsubscribeRoomRolls = null;
      roomAgentsCache = [];
      roomRollsCache = [];
      inspectedAgentId = null;

      sessionState = { roomCode: null, role: null, gmSecret: null, playerAlias: "" };
      saveSessionMeta();
      updateConnectionBadge();
      renderSessionModalBody();
    }

    async function removeAgentFromSession(agentId) {
      if (!firebaseReady || !sessionState.roomCode) return;
      await deleteDoc(doc(db, "sessions", sessionState.roomCode, "agents", agentId));
      if (inspectedAgentId === agentId) inspectedAgentId = null;
    }

    function connectToRoomListeners(roomCode) {
      if (unsubscribeRoomAgents) unsubscribeRoomAgents();
      if (unsubscribeRoomRolls) unsubscribeRoomRolls();

      const agentsCol = collection(db, "sessions", roomCode, "agents");
      unsubscribeRoomAgents = onSnapshot(agentsCol, (snapshot) => {
        roomAgentsCache = [];
        snapshot.forEach((docSnap) => roomAgentsCache.push(docSnap.data()));
        roomAgentsCache.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        renderSessionModalBody();
      });

      const rollsCol = collection(db, "sessions", roomCode, "rolls");
      unsubscribeRoomRolls = onSnapshot(rollsCol, (snapshot) => {
        roomRollsCache = [];
        snapshot.forEach((docSnap) => roomRollsCache.push(docSnap.data()));
        roomRollsCache.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
        roomRollsCache = roomRollsCache.slice(0, 25);
        renderSessionModalBody();
      });
    }

    function computeGMAgentSummary(ag) {
      const nexSteps = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 99];
      const level = Math.max(1, nexSteps.indexOf(ag.nex || 5) + 1);
      const attrs = ag.attributes || { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 };

      let basePv = 20, perPv = 4, basePe = 2, perPe = 2, baseSan = 12, perSan = 3;
      if (ag.charClass === "Especialista") {
        basePv = 16; perPv = 3; basePe = 3; perPe = 3; baseSan = 16; perSan = 4;
      } else if (ag.charClass === "Ocultista") {
        basePv = 12; perPv = 2; basePe = 4; perPe = 4; baseSan = 20; perSan = 5;
      }

      let originPv = ag.origin === "Desgarrado" ? level : 0;
      let originSan = ag.origin === "Vítima" ? level : 0;
      let originPe = ag.origin === "Universitário" ? (1 + Math.floor(level / 2)) : 0;
      let originDef = ag.origin === "Policial" ? 2 : 0;

      let powerPv = 0, powerPe = 0, powerDef = 0;
      (ag.abilities || []).forEach((ab) => {
        if (ab.name === "Sangue de Ferro") powerPv += level * 2;
        if (ab.name === "Potencial Aprimorado") powerPe += level * (ab.affinity ? 2 : 1);
        if (ab.name === "Precognição" || ab.name === "Reflexos Defensivos") powerDef += 2;
      });

      const maxPv = Math.max(1, basePv + attrs.VIG + (level - 1) * (perPv + attrs.VIG) + originPv + powerPv + (ag.bonusPv || 0));
      const maxPe = Math.max(1, basePe + attrs.PRE + (level - 1) * (perPe + attrs.PRE) + originPe + powerPe + (ag.bonusPe || 0));
      let maxSan = Math.max(1, baseSan + (level - 1) * perSan + originSan + (ag.bonusSan || 0));
      if (ag.origin === "Cultista Arrependido") maxSan = Math.floor(maxSan / 2);

      let armorDef = 0;
      (ag.inventory || []).forEach((it) => {
        if (it.type === "Proteção" && it.equipped) {
          const modBonus = (it.mods || []).includes("reforcada") ? 2 : 0;
          armorDef += (parseInt(it.defense) || 0) + modBonus;
        }
      });

      const defense = 10 + attrs.AGI + armorDef + originDef + powerDef + (ag.defenseOther || 0);
      const peLimit = level + (ag.origin === "Universitário" ? 1 : 0);
      const ritualDt = 10 + peLimit + attrs.PRE;

      return { maxPv, maxPe, maxSan, defense, peLimit, ritualDt };
    }

    function injectMultiplayerUI() {
      const topBarRight = document.querySelector("body > div:first-child .max-w-7xl > div:last-child");
      if (!document.getElementById("btn-open-session-hub")) {
        const btn = document.createElement("button");
        btn.id = "btn-open-session-hub";
        btn.type = "button";
        btn.innerHTML = `<span>🌐</span> <span id="session-btn-label">Mesa / Sessão</span>`;

        if (topBarRight) {
          btn.className = "px-2.5 py-1 rounded-md accent-soft-bg hover:brightness-110 border accent-border accent-text font-semibold transition flex items-center gap-1.5";
          topBarRight.prepend(btn);
        } else {
          btn.className = "fixed bottom-5 left-5 z-40 px-3.5 py-2 rounded-xl accent-bg text-white text-xs font-semibold shadow-xl flex items-center gap-1.5";
          document.body.appendChild(btn);
        }
      }

      if (!document.getElementById("modal-multiplayer-session")) {
        const modal = document.createElement("div");
        modal.id = "modal-multiplayer-session";
        modal.className = "fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden items-center justify-center p-4";
        modal.innerHTML = `
          <div class="bg-surface border border-borderSubtle rounded-2xl max-w-6xl w-full p-6 flex flex-col max-h-[92vh] space-y-4 shadow-2xl">
            <div class="flex items-center justify-between border-b border-borderSubtle pb-3">
              <div class="flex items-center gap-3">
                <span class="text-xl">🌐</span>
                <div>
                  <h3 class="text-base font-bold text-white">Servidores & Escudo do Mestre (Tempo Real)</h3>
                  <p class="text-xs text-zinc-400">Sincronize fichas da equipe ao vivo durante a sessão de Ordem Paranormal</p>
                </div>
              </div>
              <button type="button" id="btn-close-session-modal" class="text-zinc-400 hover:text-white text-lg px-2">✕</button>
            </div>
            <div id="session-modal-alert" class="hidden bg-rose-950/50 border border-rose-700/60 text-rose-200 text-xs rounded-xl px-3.5 py-2.5"></div>
            <div id="session-modal-body" class="overflow-y-auto flex-1 pr-1 space-y-4"></div>
          </div>
        `;
        document.body.appendChild(modal);
      }

      updateConnectionBadge();
    }

    function alertModalInfo(msg) {
      const el = document.getElementById("session-modal-alert");
      if (!el) return;
      el.textContent = msg;
      el.classList.remove("hidden");
      setTimeout(() => el.classList.add("hidden"), 7000);
    }

    function updateConnectionBadge() {
      const label = document.getElementById("session-btn-label");
      if (!label) return;
      if (sessionState.roomCode) {
        const roleTag = sessionState.role === "gm" ? "Mestre" : "Agente";
        label.textContent = `Sala ${sessionState.roomCode} (${roleTag})`;
      } else {
        label.textContent = "Mesa / Sessão";
      }
    }

    function renderSessionModalBody() {
      const body = document.getElementById("session-modal-body");
      if (!body) return;

      if (!sessionState.roomCode) {
        const statusBadgeClass = firebaseReady
          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
          : "bg-zinc-800 text-zinc-300 border-zinc-700";

        body.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2 bg-void border border-borderSubtle rounded-xl px-3.5 py-2.5 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-zinc-400">Conta:</span>
              <span class="font-mono px-2.5 py-0.5 rounded border ${statusBadgeClass}">${firebaseStatusText}</span>
            </div>
            <div class="flex items-center gap-2">
              ${firebaseReady
                ? `<button type="button" id="btn-google-logout" class="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition">Sair da Conta Google</button>`
                : `<button type="button" id="btn-google-login" class="px-3.5 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition flex items-center gap-1.5">
                    <span>🔵</span> <span>Entrar com Google</span>
                  </button>`
              }
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5 py-1">
            <div class="bg-void border border-purple-500/30 rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div class="space-y-2">
                <span class="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-500/15 accent-text border border-purple-500/30">
                  Para o Mestre da Mesa
                </span>
                <h4 class="text-lg font-bold text-white">Criar Novo Servidor / Sessão</h4>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  Gera um código exclusivo de 6 letras. Todos os jogadores que entrarem terão suas fichas, PV, PE, Sanidade, Inventário e Rolagens exibidos ao vivo no seu Escudo do Mestre.
                </p>
                <div class="pt-2">
                  <label class="block text-xs text-zinc-400 mb-1">Nome da Campanha / Operação</label>
                  <input type="text" id="sync-campaign-name" placeholder="Ex: O Segredo na Floresta - Sessão 04"
                    class="w-full bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-xs text-white outline-none" />
                </div>
              </div>
              <button type="button" id="btn-create-gm-room" class="w-full py-2.5 rounded-xl accent-bg hover:bg-purple-500 text-white text-xs font-semibold transition">
                Criar Sala como Mestre →
              </button>
            </div>

            <div class="bg-void border border-borderSubtle rounded-2xl p-5 flex flex-col justify-between gap-4">
              <div class="space-y-2">
                <span class="inline-block text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Para Jogadores
                </span>
                <h4 class="text-lg font-bold text-white">Entrar em uma Sessão</h4>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  Digite o código fornecido pelo Mestre. Sua ficha ativa atual será sincronizada automaticamente sempre que você sofrer dano, gastar PE ou rolar dados.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div>
                    <label class="block text-xs text-zinc-400 mb-1">Código da Sala</label>
                    <input type="text" id="sync-join-code" maxlength="6" placeholder="Ex: X9K2P4"
                      class="w-full bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-xs font-mono uppercase text-white outline-none" />
                  </div>
                  <div>
                    <label class="block text-xs text-zinc-400 mb-1">Seu Nome (Jogador)</label>
                    <input type="text" id="sync-player-alias" placeholder="Ex: Lucas"
                      class="w-full bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-xs text-white outline-none" />
                  </div>
                </div>
              </div>
              <div class="flex gap-2">
                <button type="button" id="btn-join-player-room" class="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition">
                  Conectar Ficha Ativa →
                </button>
                <button type="button" id="btn-rejoin-gm-room" title="Reabrir uma sala existente como Mestre" class="px-3 py-2.5 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 text-xs transition">
                  Entrar como Mestre
                </button>
              </div>
            </div>
          </div>
        `;
        return;
      }

      if (sessionState.role === "player") {
        const activeAg = getCurrentLocalAgent();
        body.innerHTML = `
          <div class="bg-void border border-emerald-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span class="text-sm font-bold text-white">Conectado à Sala <span class="font-mono text-emerald-300">${sessionState.roomCode}</span></span>
              </div>
              <p class="text-xs text-zinc-400">
                Transmitindo automaticamente: <strong class="text-white">${activeAg?.name || "Agente"}</strong> (NEX ${activeAg?.nex || 5}% • ${activeAg?.charClass || ""})
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button type="button" id="btn-force-sync-now" class="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 text-xs font-semibold transition">
                🔄 Sincronizar Agora
              </button>
              <button type="button" id="btn-leave-room" class="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 text-xs transition">
                Sair da Sala
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">Agentes Conectados nesta Sessão (${roomAgentsCache.length})</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              ${roomAgentsCache.map(ag => `
                <div class="bg-void border border-borderSubtle rounded-xl p-3 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-sm text-white">${ag.name || "Sem Nome"}</div>
                    <div class="text-[11px] text-zinc-400">${ag.charClass} • NEX ${ag.nex}% (${ag.playerAlias || "Jogador"})</div>
                  </div>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Online</span>
                </div>
              `).join("")}
            </div>
          </div>
        `;
        return;
      }

      const inspectedAgent = roomAgentsCache.find((a) => a.id === inspectedAgentId) || null;

      body.innerHTML = `
        <div class="bg-void border border-purple-500/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div class="flex flex-wrap items-center gap-4">
            <div>
              <span class="block text-[10px] font-mono uppercase text-zinc-400">Código para os Jogadores</span>
              <div class="flex items-center gap-2">
                <span class="text-2xl font-mono font-bold tracking-widest accent-text">${sessionState.roomCode}</span>
                <button type="button" id="btn-copy-room-code" class="px-2.5 py-1 rounded-lg bg-elevated hover:bg-zinc-800 border border-borderSubtle text-[11px] text-zinc-200 transition">
                  📋 Copiar Código
                </button>
              </div>
            </div>
            <div class="h-8 w-px bg-[#26262e] hidden sm:block"></div>
            <div class="text-xs text-zinc-400">
              <div>Agentes na Mesa: <strong class="text-white font-mono">${roomAgentsCache.length}</strong></div>
              <div>Status: <span class="text-emerald-400">● Escudo do Mestre Ativo</span></div>
            </div>
          </div>

          <button type="button" id="btn-leave-gm-room" class="px-3.5 py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-900/50 text-red-300 text-xs transition">
            Encerrar / Sair
          </button>
        </div>

        ${inspectedAgent ? renderInspectedAgentFullSheet(inspectedAgent) : `
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div class="lg:col-span-8 space-y-3">
              <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Fichas dos Agentes Conectados (${roomAgentsCache.length})
              </h4>
              ${roomAgentsCache.length === 0
                ? `<div class="bg-void border border-dashed border-borderSubtle rounded-2xl p-8 text-center text-xs text-zinc-500">
                    Aguardando jogadores entrarem com o código <strong class="accent-text font-mono">${sessionState.roomCode}</strong>...
                  </div>`
                : `<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${roomAgentsCache.map((ag) => {
                      const st = computeGMAgentSummary(ag);
                      const pvPct = Math.min(100, Math.max(0, Math.round(((ag.currentPv ?? st.maxPv) / st.maxPv) * 100)));
                      const pePct = Math.min(100, Math.max(0, Math.round(((ag.currentPe ?? st.maxPe) / st.maxPe) * 100)));
                      const sanPct = Math.min(100, Math.max(0, Math.round(((ag.currentSan ?? st.maxSan) / st.maxSan) * 100)));
                      const attrs = ag.attributes || { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 };

                      return `
                        <div class="bg-void border border-borderSubtle hover:border-purple-500/50 rounded-2xl p-4 space-y-3 transition">
                          <div class="flex items-start justify-between gap-2">
                            <div>
                              <h5 class="font-bold text-sm text-white">${ag.name || "Agente Sem Nome"}</h5>
                              <p class="text-[11px] text-zinc-400">${ag.charClass} • ${ag.path} • NEX ${ag.nex}%</p>
                              <p class="text-[10px] font-mono text-zinc-500">Jogador: ${ag.playerAlias || ag.player || "—"} • Origem: ${ag.origin}</p>
                            </div>
                            <div class="text-right font-mono text-xs">
                              <span class="block px-2 py-0.5 rounded bg-elevated text-white font-bold">Def ${st.defense}</span>
                              <span class="block text-[10px] text-zinc-400 mt-1">DT ${st.ritualDt}</span>
                            </div>
                          </div>

                          <div class="space-y-1.5 text-[11px] font-mono">
                            <div>
                              <div class="flex justify-between">
                                <span class="text-rose-400">PV</span>
                                <span class="text-white">${ag.currentPv ?? st.maxPv}/${st.maxPv}</span>
                              </div>
                              <div class="w-full h-1.5 bg-elevated rounded-full overflow-hidden">
                                <div class="h-full bg-rose-500" style="width:${pvPct}%"></div>
                              </div>
                            </div>
                            <div class="grid grid-cols-2 gap-2">
                              <div>
                                <div class="flex justify-between">
                                  <span class="text-amber-300">PE</span>
                                  <span class="text-white">${ag.currentPe ?? st.maxPe}/${st.maxPe}</span>
                                </div>
                                <div class="w-full h-1.5 bg-elevated rounded-full overflow-hidden">
                                  <div class="h-full bg-amber-400" style="width:${pePct}%"></div>
                                </div>
                              </div>
                              <div>
                                <div class="flex justify-between">
                                  <span class="text-sky-300">SAN</span>
                                  <span class="text-white">${ag.currentSan ?? st.maxSan}/${st.maxSan}</span>
                                </div>
                                <div class="w-full h-1.5 bg-elevated rounded-full overflow-hidden">
                                  <div class="h-full bg-sky-400" style="width:${sanPct}%"></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="grid grid-cols-5 gap-1 text-center font-mono text-[11px] bg-surface rounded-lg p-1.5 border border-borderSubtle">
                            <div><span class="text-zinc-500 block text-[9px]">AGI</span><strong class="text-white">${attrs.AGI}</strong></div>
                            <div><span class="text-zinc-500 block text-[9px]">FOR</span><strong class="text-white">${attrs.FOR}</strong></div>
                            <div><span class="text-zinc-500 block text-[9px]">INT</span><strong class="text-white">${attrs.INT}</strong></div>
                            <div><span class="text-zinc-500 block text-[9px]">PRE</span><strong class="text-white">${attrs.PRE}</strong></div>
                            <div><span class="text-zinc-500 block text-[9px]">VIG</span><strong class="text-white">${attrs.VIG}</strong></div>
                          </div>

                          <div class="flex items-center gap-2 pt-1">
                            <button type="button" data-inspect-id="${ag.id}" class="btn-inspect-agent flex-1 py-1.5 rounded-xl accent-bg/20 hover:accent-bg/35 border border-purple-500/40 accent-text text-xs font-semibold transition">
                              👁 Inspecionar Ficha Completa
                            </button>
                            <button type="button" data-kick-id="${ag.id}" title="Remover ficha da sala" class="btn-kick-agent px-2.5 py-1.5 rounded-xl bg-red-950/30 hover:bg-red-900/50 border border-red-900/40 text-red-300 text-xs">
                              ✕
                            </button>
                          </div>
                        </div>
                      `;
                    }).join("")}
                  </div>`
              }
            </div>

            <div class="lg:col-span-4 space-y-3">
              <h4 class="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                🎲 Rolagens ao Vivo na Mesa
              </h4>
              <div class="bg-void border border-borderSubtle rounded-2xl p-3 space-y-2 max-h-[460px] overflow-y-auto">
                ${roomRollsCache.length === 0
                  ? `<p class="text-center py-6 text-xs text-zinc-500">Nenhuma rolagem transmitida ainda.</p>`
                  : roomRollsCache.map(r => `
                    <div class="bg-surface border ${r.isCrit ? "border-amber-400/50" : r.isFumble ? "border-rose-500/50" : "border-borderSubtle"} rounded-xl p-2.5 flex items-center justify-between gap-2">
                      <div class="min-w-0">
                        <div class="text-[11px] font-bold accent-text truncate">${r.agentName}</div>
                        <div class="text-xs text-white truncate">${r.title}</div>
                        <div class="text-[10px] font-mono text-zinc-400 truncate">${r.detail}</div>
                      </div>
                      <span class="font-mono text-base font-bold ${r.isCrit ? "text-amber-300" : r.isFumble ? "text-rose-400" : "text-white"} shrink-0">
                        ${r.result}
                      </span>
                    </div>
                  `).join("")
                }
              </div>
            </div>
          </div>
        `}
      `;
    }

    function renderInspectedAgentFullSheet(ag) {
      const st = computeGMAgentSummary(ag);
      const trainedSkills = Object.entries(ag.skills || {})
        .filter(([, data]) => (data.rank || 0) >= 5)
        .map(([name, data]) => `${name} (+${data.rank + (data.other || 0)})`);

      return `
        <div class="bg-void border border-borderSubtle rounded-2xl p-5 space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-borderSubtle pb-3">
            <div>
              <button type="button" id="btn-gm-back-overview" class="text-xs accent-text hover:underline mb-1">← Voltar para todas as fichas</button>
              <h4 class="text-lg font-bold text-white">${ag.name} <span class="text-xs font-mono text-zinc-400">(${ag.charClass} • ${ag.path} • NEX ${ag.nex}%)</span></h4>
              <p class="text-xs text-zinc-400">Origem: ${ag.origin} • Patente: ${ag.rank} • Afinidade: ${ag.affinity || "Nenhuma"}</p>
            </div>
            <div class="flex gap-2 font-mono text-xs">
              <span class="px-3 py-1.5 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30">PV: ${ag.currentPv}/${st.maxPv}</span>
              <span class="px-3 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">PE: ${ag.currentPe}/${st.maxPe}</span>
              <span class="px-3 py-1.5 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-500/30">SAN: ${ag.currentSan}/${st.maxSan}</span>
              <span class="px-3 py-1.5 rounded-xl bg-elevated text-white border border-borderSubtle">Defesa: ${st.defense}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div class="bg-surface border border-borderSubtle rounded-xl p-3.5 space-y-2">
              <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Perícias Treinadas</h5>
              <p class="text-zinc-300 leading-relaxed font-mono text-[11px]">${trainedSkills.length ? trainedSkills.join(", ") : "Nenhuma perícia treinada."}</p>
            </div>

            <div class="bg-surface border border-borderSubtle rounded-xl p-3.5 space-y-2">
              <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Inventário & Armas (${(ag.inventory || []).length})</h5>
              <ul class="space-y-1 text-zinc-300">
                ${(ag.inventory || []).map(it => `<li>• <strong>${it.name}</strong> (${it.type}${it.damage ? ` — ${it.damage}` : ""})</li>`).join("") || "<li>Mochila vazia</li>"}
              </ul>
            </div>

            <div class="bg-surface border border-borderSubtle rounded-xl p-3.5 space-y-2">
              <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Poderes & Rituais</h5>
              <ul class="space-y-1 text-zinc-300">
                ${(ag.abilities || []).map(ab => `<li>★ <strong>${ab.name}</strong></li>`).join("")}
                ${(ag.rituals || []).map(r => `<li>📜 <strong>${r.name}</strong> (${r.element} ${r.circle}º)</li>`).join("")}
                ${!(ag.abilities?.length || ag.rituals?.length) ? "<li>Nenhum poder ou ritual registrado</li>" : ""}
              </ul>
            </div>
          </div>

          ${ag.notes || ag.clues ? `
            <div class="bg-surface border border-borderSubtle rounded-xl p-3.5 text-xs space-y-1">
              <h5 class="font-bold text-zinc-200 uppercase text-[11px]">Notas do Jogador</h5>
              <p class="text-zinc-400 whitespace-pre-line">${ag.notes || ""}\n${ag.clues || ""}</p>
            </div>
          ` : ""}
        </div>
      `;
    }

    // Delegação global de cliques para todos os botões da Mesa / Escudo do Mestre
    document.addEventListener("click", (e) => {
      const target = e.target.closest("button");
      if (!target) return;

      if (target.id === "btn-open-session-hub") {
        e.preventDefault();
        const modal = document.getElementById("modal-multiplayer-session");
        if (modal) {
          modal.classList.remove("hidden");
          modal.classList.add("flex");
          renderSessionModalBody();
        }
      } else if (target.id === "btn-close-session-modal") {
        const modal = document.getElementById("modal-multiplayer-session");
        if (modal) {
          modal.classList.add("hidden");
          modal.classList.remove("flex");
        }
      } else if (target.id === "btn-google-login") {
        loginWithGoogle();
      } else if (target.id === "btn-google-logout") {
        logoutFirebaseUser();
      } else if (target.id === "btn-create-gm-room") {
        createSessionAsGM();
      } else if (target.id === "btn-join-player-room") {
        joinSessionAsPlayer();
      } else if (target.id === "btn-rejoin-gm-room") {
        rejoinAsGM();
      } else if (target.id === "btn-force-sync-now") {
        pushActiveAgentToRoom();
      } else if (target.id === "btn-leave-room" || target.id === "btn-leave-gm-room") {
        leaveSession();
      } else if (target.id === "btn-copy-room-code") {
        const temp = document.createElement("input");
        temp.value = sessionState.roomCode;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();
        target.textContent = "✓ Copiado!";
        setTimeout(() => { target.textContent = "📋 Copiar Código"; }, 2000);
      } else if (target.classList.contains("btn-inspect-agent")) {
        inspectedAgentId = target.getAttribute("data-inspect-id");
        renderSessionModalBody();
      } else if (target.classList.contains("btn-kick-agent")) {
        removeAgentFromSession(target.getAttribute("data-kick-id"));
      } else if (target.id === "btn-gm-back-overview") {
        inspectedAgentId = null;
        renderSessionModalBody();
      }
    });

    function bootMultiplayerModule() {
      injectMultiplayerUI();
      setupRollObserver();
      initFirebaseSync();
      setInterval(() => {
        if (!document.getElementById("btn-open-session-hub")) {
          injectMultiplayerUI();
        }
      }, 1500);
    }

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", bootMultiplayerModule);
    } else {
      bootMultiplayerModule();
    }
})().then(() => (async () => {
    const { initializeApp, getApps } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
    const { getAuth, signInAnonymously, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
    const {
      getFirestore,
      doc,
      getDocFromServer,
      getDoc,
      setDoc,
      onSnapshot
    } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
    const OBS_FIRE_CONFIG = {
      apiKey: "AIzaSyDKc688y119WyFzE5yGmxkaeYQBtLlI3FM",
      authDomain: "ordo-realitas-mesa.firebaseapp.com",
      projectId: "ordo-realitas-mesa",
      storageBucket: "ordo-realitas-mesa.firebasestorage.app",
      messagingSenderId: "1049343664232",
      appId: "1:1049343664232:web:00818b1ce7f88101931bdd"
    };

    const OBS_CFG_KEY = "op_obs_portrait_settings_v1";
    const obsChannel = typeof BroadcastChannel !== "undefined" ? new BroadcastChannel("ordo_obs_portrait_bus") : null;

    // Definição completa das 4 Skins disponíveis
    const OBS_SKINS = {
      dossier: {
        id: "dossier",
        name: "🗂 Dossiê Analógico",
        desc: "Papel envelhecido, Polaroid com fita adesiva e carimbo de máquina.",
        cardClass: "skin-dossier-card",
        photoFrameClass: "skin-dossier-photo-frame",
        titleFont: "obs-font-stamp",
        monoFont: "obs-font-typewriter",
        titleColor: "#1c1815",
        subTextColor: "#574b40",
        dividerClass: "border-b border-dashed border-[#bfb29e]",
        barTrackClass: "bg-[#dfd5c5] border border-[#a89984] p-[1px]",
        pvLabelColor: "#7f1d1d",
        peLabelColor: "#92400e",
        sanLabelColor: "#1e3a8a",
        pvBar: "#991b1b",
        peBar: "#b45309",
        sanBar: "#1e40af",
        stampBoxClass: "border-2 border-[#991b1b] text-[#991b1b] bg-[#f3ede2]/95 -rotate-2",
        rollCardClass: "skin-dossier-card border-2 border-[#8b7d6b]",
        hasTape: true,
        nexInsidePolaroid: true
      },
      cris: {
        id: "cris",
        name: "📡 Terminal C.R.I.S.",
        desc: "Interface tática escura da Ordo Realitas com scanlines e HUD neon.",
        cardClass: "skin-cris-card",
        photoFrameClass: "skin-cris-photo-frame",
        titleFont: "obs-font-cris font-bold tracking-tight",
        monoFont: "obs-font-cris",
        titleColor: "#ffffff",
        subTextColor: "#a1a1aa",
        dividerClass: "border-b border-purple-500/30",
        barTrackClass: "bg-black/70 border border-zinc-700/80 rounded-sm overflow-hidden",
        pvLabelColor: "#f87171",
        peLabelColor: "#fbbf24",
        sanLabelColor: "#38bdf8",
        pvBar: "#ef4444",
        peBar: "#f59e0b",
        sanBar: "#0ea5e9",
        stampBoxClass: "border border-rose-500 bg-rose-950/90 text-rose-300 rounded px-2",
        rollCardClass: "skin-cris-card border border-purple-400/70",
        hasTape: false,
        nexInsidePolaroid: false
      },
      ritual: {
        id: "ritual",
        name: "🩸 Grimório & Sangue",
        desc: "Estética ocultista sombria com bordas carmesim e dourado ritualístico.",
        cardClass: "skin-ritual-card",
        photoFrameClass: "skin-ritual-photo-frame",
        titleFont: "obs-font-ritual font-bold tracking-wide",
        monoFont: "obs-font-cris",
        titleColor: "#fef3c7",
        subTextColor: "#d6b89c",
        dividerClass: "border-b border-amber-600/35",
        barTrackClass: "bg-[#1a0b0e] border border-[#5c1922] p-[1px]",
        pvLabelColor: "#fca5a5",
        peLabelColor: "#fcd34d",
        sanLabelColor: "#93c5fd",
        pvBar: "#dc2626",
        peBar: "#d97706",
        sanBar: "#2563eb",
        stampBoxClass: "border border-amber-400 bg-[#2b090e] text-amber-300 uppercase tracking-widest",
        rollCardClass: "skin-ritual-card border-2 border-amber-500/70",
        hasTape: false,
        nexInsidePolaroid: false
      },
      clean: {
        id: "clean",
        name: "✨ Stream Clean",
        desc: "Overlay moderno translúcido sem ruído visual, ideal para qualquer layout.",
        cardClass: "skin-clean-card",
        photoFrameClass: "skin-clean-photo-frame",
        titleFont: "obs-font-clean font-extrabold tracking-tight",
        monoFont: "obs-font-clean font-semibold",
        titleColor: "#ffffff",
        subTextColor: "#a1a1aa",
        dividerClass: "border-b border-white/10",
        barTrackClass: "bg-white/10 rounded-full overflow-hidden",
        pvLabelColor: "#fb7185",
        peLabelColor: "#fbbf24",
        sanLabelColor: "#38bdf8",
        pvBar: "#f43f5e",
        peBar: "#eab308",
        sanBar: "#0ea5e9",
        stampBoxClass: "bg-rose-600 text-white rounded-full px-2.5",
        rollCardClass: "skin-clean-card border border-white/25",
        hasTape: false,
        nexInsidePolaroid: false
      }
    };

    const obsApp = getApps().find(a => a.name === "obs-portrait-app")
      || initializeApp(OBS_FIRE_CONFIG, "obs-portrait-app");
    const obsAuth = getAuth(obsApp);
    const obsDb = getFirestore(obsApp);

    let obsSyncStatusText = "Conectando ao servidor...";

    const authReadyPromise = new Promise((resolve) => {
      onAuthStateChanged(obsAuth, (user) => {
        if (user) {
          resolve(user);
        } else {
          signInAnonymously(obsAuth)
            .then((cred) => resolve(cred.user))
            .catch((err) => {
              obsSyncStatusText = `Erro Auth (${err?.code || "falha"}): ative Login Anônimo no Firebase`;
              const statusEl = document.getElementById("obs-cloud-status-badge");
              if (statusEl) {
                statusEl.textContent = obsSyncStatusText;
                statusEl.className = "text-[11px] font-mono text-rose-400";
              }
              resolve(null);
            });
        }
      });
    });

    function getObsSettingsMap() {
      try {
        return JSON.parse(localStorage.getItem(OBS_CFG_KEY) || "{}");
      } catch (e) {
        return {};
      }
    }

    function saveObsSettingsForAgent(agentId, cfg) {
      const map = getObsSettingsMap();
      map[agentId] = { ...(map[agentId] || {}), ...cfg };
      localStorage.setItem(OBS_CFG_KEY, JSON.stringify(map));
      broadcastObsSnapshot(null, true);
    }

    function getActiveRosterAgent() {
      try {
        const raw = localStorage.getItem("op_agents_roster_v1");
        if (!raw) return null;
        const roster = JSON.parse(raw);
        if (!roster || !Array.isArray(roster.agents) || roster.agents.length === 0) return null;
        return roster.agents.find(a => a.id === roster.activeId) || roster.agents[0] || null;
      } catch (e) {
        return null;
      }
    }

    function computeObsAgentVitals(ag) {
      if (ag && typeof ag._maxPv === "number" && typeof ag._maxPe === "number" && typeof ag._maxSan === "number") {
        return { maxPv: ag._maxPv, maxPe: ag._maxPe, maxSan: ag._maxSan };
      }
      const nexSteps = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 99];
      const level = Math.max(1, nexSteps.indexOf(ag.nex || 5) + 1);
      const attrs = ag.attributes || { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 };

      let basePv = 20, perPv = 4, basePe = 2, perPe = 2, baseSan = 12, perSan = 3;
      if (ag.charClass === "Especialista") {
        basePv = 16; perPv = 3; basePe = 3; perPe = 3; baseSan = 16; perSan = 4;
      } else if (ag.charClass === "Ocultista") {
        basePv = 12; perPv = 2; basePe = 4; perPe = 4; baseSan = 20; perSan = 5;
      }

      let originPv = ag.origin === "Desgarrado" ? level : 0;
      let originSan = ag.origin === "Vítima" ? level : 0;
      let originPe = ag.origin === "Universitário" ? (1 + Math.floor(level / 2)) : 0;

      let powerPv = 0, powerPe = 0;
      (ag.abilities || []).forEach(ab => {
        if (ab.name === "Sangue de Ferro") powerPv += level * 2;
        if (ab.name === "Potencial Aprimorado") powerPe += level * (ab.affinity ? 2 : 1);
      });

      const maxPv = Math.max(1, basePv + attrs.VIG + (level - 1) * (perPv + attrs.VIG) + originPv + powerPv + (ag.bonusPv || 0));
      const maxPe = Math.max(1, basePe + attrs.PRE + (level - 1) * (perPe + attrs.PRE) + originPe + powerPe + (ag.bonusPe || 0));
      let maxSan = Math.max(1, baseSan + (level - 1) * perSan + originSan + (ag.bonusSan || 0));
      if (ag.origin === "Cultista Arrependido") maxSan = Math.floor(maxSan / 2);

      return { maxPv, maxPe, maxSan };
    }

    function compressImageDataUrl(dataUrl, maxSide = 280, quality = 0.72) {
      return new Promise((resolve) => {
        if (!dataUrl || !dataUrl.startsWith("data:image")) return resolve(dataUrl);
        const img = new Image();
        img.onload = () => {
          const ratio = Math.min(1, maxSide / Math.max(img.width, img.height));
          const w = Math.round(img.width * ratio);
          const h = Math.round(img.height * ratio);
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
      });
    }

    function encodeStandalonePayload(ag, cfg) {
      try {
        const vitals = computeObsAgentVitals(ag);
        const isHttpUrl = (u) => typeof u === "string" && /^https?:\/\//i.test(u.trim());
        const compact = {
          id: ag.id,
          n: ag.name || "Agente",
          c: ag.charClass || "",
          p: ag.path || "",
          x: ag.nex || 5,
          a: ag.affinity || "Nenhuma",
          pv: ag.currentPv ?? vitals.maxPv,
          mpv: vitals.maxPv,
          pe: ag.currentPe ?? vitals.maxPe,
          mpe: vitals.maxPe,
          san: ag.currentSan ?? vitals.maxSan,
          msan: vitals.maxSan,
          img: isHttpUrl(cfg.avatarNormal) ? cfg.avatarNormal.trim() : "",
          imgh: isHttpUrl(cfg.avatarHurt) ? cfg.avatarHurt.trim() : "",
          imgi: isHttpUrl(cfg.avatarInsane) ? cfg.avatarInsane.trim() : "",
          imgd: isHttpUrl(cfg.avatarDying) ? cfg.avatarDying.trim() : "",
          sb: cfg.showBars !== false ? 1 : 0,
          sn: cfg.showName !== false ? 1 : 0,
          sx: cfg.showNex !== false ? 1 : 0,
          sk: cfg.skin || "dossier"
        };
        const json = JSON.stringify(compact);
        return btoa(unescape(encodeURIComponent(json)));
      } catch (e) {
        return "";
      }
    }

    function decodeStandalonePayload(encodedStr) {
      if (!encodedStr) return null;
      try {
        const json = decodeURIComponent(escape(atob(encodedStr)));
        const d = JSON.parse(json);
        return {
          agent: {
            id: d.id || "standalone_agent",
            name: d.n || "",
            charClass: d.c || "",
            path: d.p || "",
            nex: d.x || 5,
            affinity: d.a || "Nenhuma",
            currentPv: d.pv,
            _maxPv: d.mpv,
            currentPe: d.pe,
            _maxPe: d.mpe,
            currentSan: d.san,
            _maxSan: d.msan
          },
          obsCfg: {
            avatarNormal: d.img || "",
            avatarHurt: d.imgh || "",
            avatarInsane: d.imgi || "",
            avatarDying: d.imgd || "",
            showBars: d.sb !== 0,
            showName: d.sn !== 0,
            showNex: d.sx !== 0,
            skin: d.sk || "dossier"
          }
        };
      } catch (e) {
        return null;
      }
    }

    let obsCloudSyncTimer = null;
    async function pushObsCloudStream(ag, cfg, rollEvent = null) {
      if (!ag || !ag.id) return;
      try {
        await authReadyPromise;
        const cleanCfg = { ...cfg };
        for (const k of ["avatarNormal", "avatarHurt", "avatarInsane", "avatarDying"]) {
          if (cleanCfg[k] && cleanCfg[k].startsWith("data:")) {
            cleanCfg[k] = await compressImageDataUrl(cleanCfg[k], 280, 0.72);
          }
        }

        const nowTs = Date.now();
        const rollPayload = rollEvent
          ? { ...rollEvent, rollId: rollEvent.rollId || nowTs }
          : null;

        const payload = {
          agent: {
            id: ag.id,
            name: ag.name || "Agente",
            charClass: ag.charClass || "",
            path: ag.path || "",
            origin: ag.origin || "",
            nex: ag.nex || 5,
            affinity: ag.affinity || "Nenhuma",
            attributes: ag.attributes || { AGI: 1, FOR: 1, INT: 1, PRE: 1, VIG: 1 },
            abilities: ag.abilities || [],
            currentPv: ag.currentPv,
            currentPe: ag.currentPe,
            currentSan: ag.currentSan,
            bonusPv: ag.bonusPv || 0,
            bonusPe: ag.bonusPe || 0,
            bonusSan: ag.bonusSan || 0
          },
          obsCfg: cleanCfg,
          rollEvent: rollPayload,
          updatedAt: nowTs
        };

        await setDoc(doc(obsDb, "sessions", "OBS_LIVE_PORTRAIT", "agents", ag.id), payload);
        await setDoc(doc(obsDb, "sessions", "OBS_LIVE_PORTRAIT", "agents", "latest_active_agent"), payload);

        const hora = new Date(nowTs).toLocaleTimeString("pt-BR");
        obsSyncStatusText = `✓ Sincronizado com o OBS (${hora})`;
        const statusEl = document.getElementById("obs-cloud-status-badge");
        if (statusEl) {
          statusEl.textContent = obsSyncStatusText;
          statusEl.className = "text-[11px] font-mono text-emerald-400";
        }
      } catch (err) {
        obsSyncStatusText = `⚠ Erro Firestore (${err?.code || "permissão"}): verifique Regras ou Login Anônimo`;
        const statusEl = document.getElementById("obs-cloud-status-badge");
        if (statusEl) {
          statusEl.textContent = obsSyncStatusText;
          statusEl.className = "text-[11px] font-mono text-rose-400";
        }
      }
    }

    function broadcastObsSnapshot(rollEvent = null, immediate = false) {
      const ag = getActiveRosterAgent();
      if (!ag) return;
      const cfg = getObsSettingsMap()[ag.id] || {};
      const rollWithId = rollEvent
        ? { ...rollEvent, rollId: rollEvent.rollId || `${Date.now()}_${Math.random().toString(36).slice(2, 7)}` }
        : null;

      const payload = {
        type: "OBS_PORTRAIT_UPDATE",
        agent: ag,
        obsCfg: cfg,
        rollEvent: rollWithId,
        ts: Date.now()
      };
      if (obsChannel) obsChannel.postMessage(payload);

      clearTimeout(obsCloudSyncTimer);
      if (immediate) {
        pushObsCloudStream(ag, cfg, rollWithId);
      } else {
        obsCloudSyncTimer = setTimeout(() => {
          pushObsCloudStream(ag, cfg, rollWithId);
        }, rollWithId ? 20 : 100);
      }
    }

    // ==================== 1. MODO OVERLAY TRANSPARENTE (?obs=1) ====================
    const urlParams = new URLSearchParams(window.location.search);
    const isObsMode = urlParams.get("obs") === "1";

    if (isObsMode) {
      document.documentElement.classList.add("obs-stream-mode");

      const targetAgentId = urlParams.get("agent") || null;
      const targetRoomCode = (urlParams.get("room") || "").trim().toUpperCase();
      const layoutMode = urlParams.get("layout") || "webcam";
      const forcedSkinParam = urlParams.get("skin") || null;
      const hideBarsParam = urlParams.get("bars") === "0";
      const hideDiceParam = urlParams.get("dice") === "0";
      const embeddedData = decodeStandalonePayload(urlParams.get("d"));

      const stage = document.createElement("div");
      stage.id = "obs-stream-stage";
      stage.className = layoutMode === "webcam"
        ? "w-screen h-screen flex items-end justify-start p-5 select-none relative"
        : "w-screen h-screen flex items-end justify-center p-5 select-none relative";
      document.body.appendChild(stage);

      let currentObsAgent = embeddedData?.agent?.name ? embeddedData.agent : null;
      let currentObsCfg = embeddedData?.obsCfg || {};
      let lastRollTimeout = null;
      const shownRollIds = new Set();
      let lastRenderedHash = "";
      let activeRollHtml = "";

      function getActiveSkin(cfg) {
        const key = forcedSkinParam || cfg?.skin || "dossier";
        return OBS_SKINS[key] || OBS_SKINS.dossier;
      }

      function showObsDiagnostic(msg) {
        if (currentObsAgent) return;
        stage.innerHTML = `
          <div class="skin-dossier-card p-4 max-w-md obs-font-typewriter text-xs space-y-1">
            <div class="obs-font-stamp font-bold text-sm text-[#7f1d1d]">AGUARDANDO SINAL DA FICHA...</div>
            <p class="text-[#3b3129]">${msg}</p>
          </div>
        `;
      }

      function triggerObsRollPopup(rollEvent, skin) {
        if (hideDiceParam || !rollEvent || !rollEvent.result) return;
        const uniqueId = String(rollEvent.rollId || `${rollEvent.title}|${rollEvent.result}`);
        if (shownRollIds.has(uniqueId)) return;
        shownRollIds.add(uniqueId);
        if (shownRollIds.size > 30) {
          const firstKey = shownRollIds.values().next().value;
          shownRollIds.delete(firstKey);
        }

        const resultColor = rollEvent.isCrit ? "#f59e0b" : rollEvent.isFumble ? "#ef4444" : skin.titleColor;

        activeRollHtml = `
          <div class="obs-roll-note mb-3 px-4 py-2.5 ${skin.rollCardClass} flex items-center justify-between gap-3">
            <div class="min-w-0">
              <div class="text-xs ${skin.titleFont} uppercase tracking-wide truncate" style="color:${skin.titleColor}">${rollEvent.title}</div>
              <div class="text-[11px] ${skin.monoFont} truncate" style="color:${skin.subTextColor}">${rollEvent.detail}</div>
            </div>
            <div class="text-3xl ${skin.titleFont} font-bold pl-3 border-l border-dashed border-current/30"
                 style="color: ${resultColor};">
              ${rollEvent.result}
            </div>
          </div>
        `;

        const slot = document.getElementById("obs-live-roll-slot");
        if (slot) slot.innerHTML = activeRollHtml;

        clearTimeout(lastRollTimeout);
        lastRollTimeout = setTimeout(() => {
          activeRollHtml = "";
          const s = document.getElementById("obs-live-roll-slot");
          if (s) s.innerHTML = "";
        }, 4800);
      }

      function renderObsOverlay(rollEvent = null, force = false) {
        if (!currentObsAgent) return;

        const ag = currentObsAgent;
        const cfg = currentObsCfg || {};
        const skin = getActiveSkin(cfg);
        const vitals = computeObsAgentVitals(ag);

        const curPv = ag.currentPv ?? vitals.maxPv;
        const curPe = ag.currentPe ?? vitals.maxPe;
        const curSan = ag.currentSan ?? vitals.maxSan;

        const stateHash = JSON.stringify({
          sk: skin.id,
          n: ag.name, x: ag.nex, a: ag.affinity,
          pv: curPv, mpv: vitals.maxPv,
          pe: curPe, mpe: vitals.maxPe,
          san: curSan, msan: vitals.maxSan,
          img: cfg.avatarNormal, imgh: cfg.avatarHurt,
          imgi: cfg.avatarInsane, imgd: cfg.avatarDying,
          sb: cfg.showBars, sn: cfg.showName, sx: cfg.showNex
        });

        if (!force && stateHash === lastRenderedHash) {
          if (rollEvent) triggerObsRollPopup(rollEvent, skin);
          return;
        }
        lastRenderedHash = stateHash;

        const pvPct = Math.min(100, Math.max(0, Math.round((curPv / vitals.maxPv) * 100)));
        const pePct = Math.min(100, Math.max(0, Math.round((curPe / vitals.maxPe) * 100)));
        const sanPct = Math.min(100, Math.max(0, Math.round((curSan / vitals.maxSan) * 100)));

        const isDying = curPv <= 0;
        const isHurt = curPv > 0 && curPv <= Math.floor(vitals.maxPv / 2);
        const isInsane = curSan <= Math.floor(vitals.maxSan / 2);

        let chosenUrl = cfg.avatarNormal || "";
        let autoFilterClass = "";
        let statusStamp = "";

        if (isDying) {
          chosenUrl = cfg.avatarDying || cfg.avatarHurt || cfg.avatarNormal || "";
          autoFilterClass = cfg.avatarDying ? "" : "obs-dying-filter";
          statusStamp = "MORRENDO";
        } else if (isInsane) {
          chosenUrl = cfg.avatarInsane || cfg.avatarNormal || "";
          autoFilterClass = cfg.avatarInsane ? "" : "obs-mad-filter";
          statusStamp = curSan <= 0 ? "ENLOUQUECENDO" : "PERTURBADO";
        } else if (isHurt) {
          chosenUrl = cfg.avatarHurt || cfg.avatarNormal || "";
          autoFilterClass = cfg.avatarHurt ? "" : "obs-hurt-filter";
          statusStamp = "MACHUCADO";
        }

        const initials = (ag.name || "AG")
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map(w => w[0]?.toUpperCase() || "")
          .join("") || "AG";

        const showBars = !hideBarsParam && cfg.showBars !== false;
        const showName = cfg.showName !== false;
        const showNex = cfg.showNex !== false;

        if (layoutMode === "webcam") {
          const photoHtml = chosenUrl
            ? `<img src="${chosenUrl}" alt="${ag.name}" class="w-full h-full object-cover object-top transition-all duration-300 ${autoFilterClass}" />`
            : `<div class="w-full h-full flex flex-col items-center justify-center ${skin.titleFont} text-3xl ${autoFilterClass}" style="color:${skin.subTextColor}">
                 <span>${initials}</span>
               </div>`;

          stage.innerHTML = `
            <div class="w-[520px] max-w-full flex flex-col items-stretch">
              <div id="obs-live-roll-slot">${activeRollHtml}</div>

              <div class="relative flex items-center gap-4 p-3.5 pt-4 ${skin.cardClass}">
                ${skin.hasTape ? `
                  <div class="obs-tape-strip absolute -top-2.5 left-10 w-20 h-4 -rotate-2"></div>
                  <div class="obs-tape-strip absolute -top-2 right-12 w-16 h-4 rotate-1"></div>
                ` : ""}

                <div class="${skin.photoFrameClass} w-28 h-32 shrink-0 relative">
                  <div class="w-full h-full overflow-hidden rounded-[inherit]">
                    ${photoHtml}
                  </div>
                  ${showNex && skin.nexInsidePolaroid ? `
                    <span class="absolute bottom-1 left-2 right-2 text-center text-[10px] ${skin.monoFont} font-bold tracking-wider" style="color:${skin.subTextColor}">
                      NEX ${ag.nex || 5}%
                    </span>` : ""}
                </div>

                <div class="flex-1 min-w-0 flex flex-col justify-between gap-2">
                  <div class="flex items-start justify-between gap-2 ${skin.dividerClass} pb-1.5">
                    <div class="min-w-0 flex-1">
                      ${showName ? `
                        <h1 class="text-[28px] ${skin.titleFont} font-extrabold truncate leading-none tracking-tight" style="color:${skin.titleColor}">
                          ${ag.name || "Agente"}
                        </h1>` : ""}
                      ${showNex && !skin.nexInsidePolaroid ? `
                        <span class="text-[11px] ${skin.monoFont} font-bold tracking-wider block mt-1" style="color:${skin.subTextColor}">
                          ${ag.charClass ? `${ag.charClass} • ` : ""}NEX ${ag.nex || 5}%
                        </span>` : ""}
                    </div>

                    ${statusStamp ? `
                      <span class="px-2 py-0.5 text-[10px] ${skin.titleFont} font-bold uppercase tracking-wider shrink-0 self-center ${skin.stampBoxClass}">
                        ${statusStamp}
                      </span>` : ""}
                  </div>

                  ${showBars ? `
                    <div class="space-y-2 ${skin.monoFont}">
                      <div>
                        <div class="flex items-baseline justify-between text-xs mb-0.5">
                          <span class="font-bold tracking-wider" style="color:${skin.pvLabelColor}">VITALIDADE (PV)</span>
                          <span class="text-base font-bold" style="color:${skin.titleColor}">
                            ${curPv}<span class="text-xs font-normal" style="color:${skin.subTextColor}">/${vitals.maxPv}</span>
                          </span>
                        </div>
                        <div class="w-full h-3 ${skin.barTrackClass}">
                          <div class="h-full transition-all duration-300" style="width:${pvPct}%; background-color:${skin.pvBar};"></div>
                        </div>
                      </div>

                      <div class="grid grid-cols-2 gap-3">
                        <div>
                          <div class="flex items-baseline justify-between text-xs mb-0.5">
                            <span class="font-bold" style="color:${skin.peLabelColor}">ESFORÇO</span>
                            <span class="text-sm font-bold" style="color:${skin.titleColor}">
                              ${curPe}<span class="text-[11px] font-normal" style="color:${skin.subTextColor}">/${vitals.maxPe}</span>
                            </span>
                          </div>
                          <div class="w-full h-2.5 ${skin.barTrackClass}">
                            <div class="h-full transition-all duration-300" style="width:${pePct}%; background-color:${skin.peBar};"></div>
                          </div>
                        </div>

                        <div>
                          <div class="flex items-baseline justify-between text-xs mb-0.5">
                            <span class="font-bold" style="color:${skin.sanLabelColor}">SANIDADE</span>
                            <span class="text-sm font-bold" style="color:${skin.titleColor}">
                              ${curSan}<span class="text-[11px] font-normal" style="color:${skin.subTextColor}">/${vitals.maxSan}</span>
                            </span>
                          </div>
                          <div class="w-full h-2.5 ${skin.barTrackClass}">
                            <div class="h-full transition-all duration-300" style="width:${sanPct}%; background-color:${skin.sanBar};"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ` : ""}
                </div>
              </div>
            </div>
          `;

          if (rollEvent) triggerObsRollPopup(rollEvent, skin);
          return;
        }

        // Layout Vertical (Card)
        const cardPhoto = chosenUrl
          ? `<img src="${chosenUrl}" alt="${ag.name}" class="w-full h-full object-cover object-top transition-all duration-300 ${autoFilterClass}" />`
          : `<div class="w-full h-full flex items-center justify-center ${skin.titleFont} text-5xl ${autoFilterClass}" style="color:${skin.subTextColor}">
               ${initials}
             </div>`;

        stage.innerHTML = `
          <div class="w-[360px] flex flex-col items-stretch">
            <div id="obs-live-roll-slot">${activeRollHtml}</div>

            <div class="relative p-4 pt-5 ${skin.cardClass} space-y-3">
              ${skin.hasTape ? `<div class="obs-tape-strip absolute -top-2.5 left-1/2 -translate-x-1/2 w-24 h-4 -rotate-1"></div>` : ""}

              <div class="${skin.photoFrameClass} !transform-none !p-2 !pb-3 relative">
                <div class="w-full h-[270px] overflow-hidden">
                  ${cardPhoto}
                </div>

                ${statusStamp ? `
                  <div class="absolute top-4 right-4 px-2.5 py-1 text-xs ${skin.titleFont} font-bold uppercase tracking-wider shadow ${skin.stampBoxClass}">
                    ${statusStamp}
                  </div>` : ""}

                <div class="mt-2.5 flex items-baseline justify-between gap-2 px-1">
                  ${showName ? `
                    <h1 class="text-[28px] ${skin.titleFont} font-extrabold truncate leading-none tracking-tight" style="color:${skin.titleColor}">
                      ${ag.name || "Agente"}
                    </h1>` : `<span></span>`}
                  ${showNex ? `
                    <span class="text-xs ${skin.monoFont} font-bold shrink-0" style="color:${skin.subTextColor}">
                      NEX ${ag.nex || 5}%
                    </span>` : ""}
                </div>
              </div>

              ${showBars ? `
                <div class="space-y-2 ${skin.monoFont} pt-0.5">
                  <div>
                    <div class="flex items-baseline justify-between text-xs mb-0.5">
                      <span class="font-bold" style="color:${skin.pvLabelColor}">PV</span>
                      <span class="text-base font-bold" style="color:${skin.titleColor}">${curPv}<span class="text-xs font-normal" style="color:${skin.subTextColor}">/${vitals.maxPv}</span></span>
                    </div>
                    <div class="w-full h-3 ${skin.barTrackClass}">
                      <div class="h-full transition-all duration-300" style="width:${pvPct}%; background-color:${skin.pvBar};"></div>
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <div class="flex items-baseline justify-between text-xs mb-0.5">
                        <span class="font-bold" style="color:${skin.peLabelColor}">PE</span>
                        <span class="text-sm font-bold" style="color:${skin.titleColor}">${curPe}<span class="text-[11px] font-normal" style="color:${skin.subTextColor}">/${vitals.maxPe}</span></span>
                      </div>
                      <div class="w-full h-2.5 ${skin.barTrackClass}">
                        <div class="h-full transition-all duration-300" style="width:${pePct}%; background-color:${skin.peBar};"></div>
                      </div>
                    </div>

                    <div>
                      <div class="flex items-baseline justify-between text-xs mb-0.5">
                        <span class="font-bold" style="color:${skin.sanLabelColor}">SAN</span>
                        <span class="text-sm font-bold" style="color:${skin.titleColor}">${curSan}<span class="text-[11px] font-normal" style="color:${skin.subTextColor}">/${vitals.maxSan}</span></span>
                      </div>
                      <div class="w-full h-2.5 ${skin.barTrackClass}">
                        <div class="h-full transition-all duration-300" style="width:${sanPct}%; background-color:${skin.sanBar};"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ` : ""}
            </div>
          </div>
        `;

        if (rollEvent) triggerObsRollPopup(rollEvent, skin);
      }

      function applyCloudPayload(data) {
        if (!data || !data.agent) return;
        currentObsAgent = data.agent;
        if (data.obsCfg) {
          currentObsCfg = { ...currentObsCfg, ...data.obsCfg };
        }
        renderObsOverlay(data.rollEvent || null);
      }

      function syncFromLocalStorage() {
        try {
          const raw = localStorage.getItem("op_agents_roster_v1");
          if (!raw) return false;
          const roster = JSON.parse(raw);
          const found = targetAgentId
            ? roster.agents.find(a => a.id === targetAgentId)
            : (roster.agents.find(a => a.id === roster.activeId) || roster.agents[0]);
          if (found) {
            currentObsAgent = found;
            currentObsCfg = { ...currentObsCfg, ...(getObsSettingsMap()[found.id] || {}) };
            renderObsOverlay();
            return true;
          }
        } catch (e) {}
        return false;
      }

      if (obsChannel) {
        obsChannel.onmessage = (ev) => {
          const data = ev.data;
          if (!data || data.type !== "OBS_PORTRAIT_UPDATE") return;
          if (targetAgentId && data.agent?.id !== targetAgentId) return;
          currentObsAgent = data.agent;
          currentObsCfg = { ...currentObsCfg, ...(data.obsCfg || {}) };
          renderObsOverlay(data.rollEvent || null);
        };
      }

      async function bootstrapObsRealtime() {
        syncFromLocalStorage();
        if (currentObsAgent) {
          renderObsOverlay(null, true);
        } else {
          showObsDiagnostic("Conectando ao banco de dados da Ordo Realitas...");
        }

        const user = await authReadyPromise;
        if (!user) {
          showObsDiagnostic("Erro de autenticação: ative o provedor 'Anônimo' em Authentication > Sign-in method no Firebase Console.");
          return;
        }

        const docIdToWatch = targetAgentId || "latest_active_agent";
        const overlayDocRef = doc(obsDb, "sessions", "OBS_LIVE_PORTRAIT", "agents", docIdToWatch);

        onSnapshot(
          overlayDocRef,
          (liveSnap) => {
            if (liveSnap.exists()) {
              applyCloudPayload(liveSnap.data());
            } else {
              showObsDiagnostic("Abra a ficha no navegador e altere algum valor (ou clique em OBS Portrait) para enviar os dados.");
            }
          },
          (err) => {
            showObsDiagnostic(`Erro Firestore (${err.code}): verifique as Regras de Segurança do banco.`);
          }
        );

        if (targetRoomCode && targetAgentId) {
          onSnapshot(doc(obsDb, "sessions", targetRoomCode, "agents", targetAgentId), (roomSnap) => {
            if (roomSnap.exists()) {
              currentObsAgent = roomSnap.data();
              renderObsOverlay();
            }
          });
        }

        setInterval(async () => {
          try {
            const snap = await getDocFromServer(overlayDocRef);
            if (snap.exists()) applyCloudPayload(snap.data());
          } catch (e) {
            try {
              const fallbackSnap = await getDoc(overlayDocRef);
              if (fallbackSnap.exists()) applyCloudPayload(fallbackSnap.data());
            } catch (_) {}
          }
        }, 1200);
      }

      bootstrapObsRealtime();
    }

    // ==================== 2. MODO NORMAL DA FICHA: SELETOR DE SKINS & ENVIO ====================
    if (!isObsMode) {
      let lastRosterJson = localStorage.getItem("op_agents_roster_v1") || "";
      let lastCfgJson = localStorage.getItem(OBS_CFG_KEY) || "";
      let lastRollDispatchTs = 0;

      setInterval(() => {
        const curRoster = localStorage.getItem("op_agents_roster_v1") || "";
        const curCfg = localStorage.getItem(OBS_CFG_KEY) || "";
        if (curRoster !== lastRosterJson || curCfg !== lastCfgJson) {
          lastRosterJson = curRoster;
          lastCfgJson = curCfg;
          broadcastObsSnapshot(null, true);
        }
      }, 400);

      function attachObsRollListener() {
        const toastBox = document.getElementById("toast-container");
        if (!toastBox || toastBox.dataset.obsBound === "1") return;
        toastBox.dataset.obsBound = "1";

        const obsRollWatcher = new MutationObserver((mutations) => {
          for (const m of mutations) {
            for (const node of m.addedNodes) {
              if (node.nodeType === 1) {
                const title = node.querySelector("span.text-xs.font-semibold")?.textContent?.trim() || "Teste";
                const detail = node.querySelector("p.text-xs.font-mono")?.textContent?.trim() || "";
                const result = node.querySelector("div.text-2xl.font-mono")?.textContent?.trim() || "";
                const isCrit = node.classList.contains("border-amber-400");
                const isFumble = node.classList.contains("border-rose-500");
                if (result) {
                  const now = Date.now();
                  if (now - lastRollDispatchTs < 900) return;
                  lastRollDispatchTs = now;
                  const rollId = `${now}_${Math.random().toString(36).slice(2, 7)}`;
                  broadcastObsSnapshot({ title, detail, result, isCrit, isFumble, rollId }, true);
                  return;
                }
              }
            }
          }
        });
        obsRollWatcher.observe(toastBox, { childList: true });
      }

      function injectObsPortraitButtonAndModal() {
        const topBarRight = document.querySelector("body > div:first-child .max-w-7xl > div:last-child");
        if (topBarRight && !document.getElementById("btn-open-obs-modal")) {
          const btn = document.createElement("button");
          btn.id = "btn-open-obs-modal";
          btn.type = "button";
          btn.className = "px-2.5 py-1 rounded-md bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-200 font-semibold transition flex items-center gap-1.5";
          btn.innerHTML = `<span>🎥</span> <span class="hidden md:inline">OBS Portrait</span>`;
          topBarRight.prepend(btn);
        }

        if (!document.getElementById("modal-obs-portrait")) {
          const modal = document.createElement("div");
          modal.id = "modal-obs-portrait";
          modal.className = "fixed inset-0 bg-black/85 backdrop-blur-sm z-50 hidden items-center justify-center p-4";
          modal.innerHTML = `
            <div class="bg-surface border border-borderSubtle rounded-2xl max-w-3xl w-full p-6 flex flex-col max-h-[90vh] space-y-4 shadow-2xl">
              <div class="flex items-center justify-between border-b border-borderSubtle pb-3">
                <div class="flex items-center gap-2.5">
                  <span class="text-xl">🎥</span>
                  <div>
                    <h3 class="text-base font-bold text-white">OBS Studio — Portrait & Skins de Stream</h3>
                    <p id="obs-cloud-status-badge" class="text-[11px] font-mono text-zinc-400">${obsSyncStatusText}</p>
                  </div>
                </div>
                <button type="button" id="btn-close-obs-modal" class="text-zinc-400 hover:text-white text-lg px-2">✕</button>
              </div>
              <div id="obs-modal-content" class="overflow-y-auto flex-1 pr-1 space-y-4"></div>
            </div>
          `;
          document.body.appendChild(modal);
        }
      }

      function buildObsUrl(agentId, layout = "webcam", skinId = "dossier") {
        const baseUrl = window.location.href.split("?")[0].split("#")[0];
        let sessionMeta = {};
        try {
          sessionMeta = JSON.parse(localStorage.getItem("op_multiplayer_session_v1") || "{}");
        } catch (e) {}

        const ag = getActiveRosterAgent();
        const cfg = ag ? { ...(getObsSettingsMap()[ag.id] || {}), skin: skinId } : { skin: skinId };
        const standalonePayload = ag ? encodeStandalonePayload(ag, cfg) : "";

        const params = new URLSearchParams();
        params.set("obs", "1");
        params.set("layout", layout);
        params.set("skin", skinId);
        if (agentId) params.set("agent", agentId);
        if (sessionMeta.roomCode) params.set("room", sessionMeta.roomCode);
        if (standalonePayload) params.set("d", standalonePayload);
        return `${baseUrl}?${params.toString()}`;
      }

      let selectedObsLayout = "webcam";

      function renderObsConfigModal() {
        const container = document.getElementById("obs-modal-content");
        if (!container) return;

        const ag = getActiveRosterAgent();
        if (!ag) {
          container.innerHTML = `<p class="text-xs text-zinc-400">Selecione ou crie um agente primeiro.</p>`;
          return;
        }

        const cfg = getObsSettingsMap()[ag.id] || {};
        const activeSkinId = cfg.skin || "dossier";
        broadcastObsSnapshot(null, true);

        const obsUrl = buildObsUrl(ag.id, selectedObsLayout, activeSkinId);
        const recSize = selectedObsLayout === "webcam" ? "Largura: 560 × Altura: 255" : "Largura: 400 × Altura: 500";

        const skinCardsHtml = Object.values(OBS_SKINS).map(sk => {
          const isSelected = sk.id === activeSkinId;
          return `
            <button type="button" data-obs-skin="${sk.id}"
              class="p-3 rounded-xl border text-left transition flex flex-col justify-between gap-1 ${isSelected ? "border-purple-400 bg-purple-500/15 text-white shadow-md" : "border-borderSubtle bg-surface text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"}">
              <div class="flex items-center justify-between gap-1">
                <span class="font-bold text-xs">${sk.name}</span>
                ${isSelected ? `<span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/30 accent-text">Ativa</span>` : ""}
              </div>
              <p class="text-[11px] text-zinc-400 leading-snug">${sk.desc}</p>
            </button>
          `;
        }).join("");

        container.innerHTML = `
          <div class="bg-void border border-purple-500/35 rounded-2xl p-4 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold accent-text uppercase tracking-wider">1. Escolha a Skin Visual do Portrait</span>
              <span class="text-[11px] font-mono text-zinc-400">Troca em tempo real no OBS sem precisar reconfigurar</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${skinCardsHtml}
            </div>
          </div>

          <div class="bg-void border border-amber-500/35 rounded-2xl p-4 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold text-amber-300 uppercase tracking-wider">2. Formato & Link do OBS</span>
              <span class="text-[11px] font-mono text-zinc-400">Agente: <strong class="text-emerald-400">${ag.name} (NEX ${ag.nex || 5}%)</strong></span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <button type="button" data-obs-layout="webcam"
                class="p-2.5 rounded-xl border text-left transition ${selectedObsLayout === "webcam" ? "border-amber-400 bg-amber-500/15 text-white" : "border-borderSubtle bg-surface text-zinc-400 hover:text-zinc-200"}">
                <div class="font-bold flex items-center justify-between">
                  <span>🗂 Horizontal (Webcam / Canto)</span>
                  <span class="text-[10px] font-mono text-amber-300">560×255</span>
                </div>
                <p class="text-[11px] text-zinc-400 mt-0.5">Retrato à esquerda + barras e rolagens ao lado.</p>
              </button>

              <button type="button" data-obs-layout="card"
                class="p-2.5 rounded-xl border text-left transition ${selectedObsLayout === "card" ? "border-amber-400 bg-amber-500/15 text-white" : "border-borderSubtle bg-surface text-zinc-400 hover:text-zinc-200"}">
                <div class="font-bold flex items-center justify-between">
                  <span>📎 Vertical (Card Completo)</span>
                  <span class="text-[10px] font-mono text-amber-300">400×500</span>
                </div>
                <p class="text-[11px] text-zinc-400 mt-0.5">Retrato grande vertical com status abaixo.</p>
              </button>
            </div>

            <div class="flex gap-2">
              <input type="text" id="obs-generated-url" readonly value="${obsUrl}"
                class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-xs font-mono text-zinc-200 outline-none" />
              <button type="button" id="btn-copy-obs-url" class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition shrink-0">
                📋 Copiar Link OBS
              </button>
              <a href="${obsUrl}" target="_blank" class="px-3 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-xs text-zinc-200 font-medium transition shrink-0">
                ↗ Testar
              </a>
            </div>
            <p class="text-[11px] text-zinc-400">
              No OBS Studio: <strong>Fontes (+) → Navegador</strong> → Cole o link → Dimensões: <code class="text-amber-300 font-mono">${recSize}</code>.
            </p>
          </div>

          <div class="bg-void border border-borderSubtle rounded-2xl p-4 space-y-3">
            <span class="block text-xs font-bold text-white uppercase tracking-wider">3. Expressões & Fotografia do Agente</span>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label class="block text-zinc-400 mb-1">Foto Padrão (Normal)</label>
                <div class="flex gap-1.5">
                  <input type="text" id="obs-input-normal" value="${cfg.avatarNormal || ""}" placeholder="https://... ou clique na pasta →"
                    class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-white outline-none" />
                  <label class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 cursor-pointer shrink-0">
                    📁 <input type="file" accept="image/*" data-obs-file="avatarNormal" class="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-rose-300 mb-1">Foto Machucado (≤ 50% PV) <span class="text-zinc-500">(opcional)</span></label>
                <div class="flex gap-1.5">
                  <input type="text" id="obs-input-hurt" value="${cfg.avatarHurt || ""}" placeholder="Filtro automático se vazio"
                    class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-white outline-none" />
                  <label class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 cursor-pointer shrink-0">
                    📁 <input type="file" accept="image/*" data-obs-file="avatarHurt" class="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-sky-300 mb-1">Foto Perturbado / Enlouquecendo <span class="text-zinc-500">(opcional)</span></label>
                <div class="flex gap-1.5">
                  <input type="text" id="obs-input-insane" value="${cfg.avatarInsane || ""}" placeholder="Filtro automático se vazio"
                    class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-white outline-none" />
                  <label class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 cursor-pointer shrink-0">
                    📁 <input type="file" accept="image/*" data-obs-file="avatarInsane" class="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label class="block text-zinc-400 mb-1">Foto Morrendo (0 PV) <span class="text-zinc-500">(opcional)</span></label>
                <div class="flex gap-1.5">
                  <input type="text" id="obs-input-dying" value="${cfg.avatarDying || ""}" placeholder="P&B automático se vazio"
                    class="flex-1 bg-surface border border-borderSubtle rounded-xl px-3 py-2 text-white outline-none" />
                  <label class="px-2.5 py-2 rounded-xl bg-elevated hover:bg-zinc-800 border border-borderSubtle text-zinc-300 cursor-pointer shrink-0">
                    📁 <input type="file" accept="image/*" data-obs-file="avatarDying" class="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center gap-5 pt-2 border-t border-borderSubtle text-xs text-zinc-300">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="obs-chk-bars" ${cfg.showBars !== false ? "checked" : ""} />
                <span>Mostrar Barras & Números (PV / PE / SAN)</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="obs-chk-name" ${cfg.showName !== false ? "checked" : ""} />
                <span>Mostrar Nome do Personagem</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="obs-chk-nex" ${cfg.showNex !== false ? "checked" : ""} />
                <span>Mostrar NEX</span>
              </label>
            </div>

            <div class="flex justify-end pt-1">
              <button type="button" id="btn-save-obs-cfg" class="px-5 py-2 rounded-xl accent-bg hover:bg-purple-500 text-white text-xs font-semibold transition">
                Salvar & Atualizar Link
              </button>
            </div>
          </div>
        `;
      }

      document.addEventListener("click", (e) => {
        const skinBtn = e.target.closest("[data-obs-skin]");
        if (skinBtn) {
          const ag = getActiveRosterAgent();
          if (ag) {
            saveObsSettingsForAgent(ag.id, { skin: skinBtn.getAttribute("data-obs-skin") });
            renderObsConfigModal();
          }
          return;
        }

        const layoutBtn = e.target.closest("[data-obs-layout]");
        if (layoutBtn) {
          selectedObsLayout = layoutBtn.getAttribute("data-obs-layout");
          renderObsConfigModal();
          return;
        }

        const btn = e.target.closest("button");
        if (!btn) return;

        if (btn.id === "btn-open-obs-modal") {
          const modal = document.getElementById("modal-obs-portrait");
          if (modal) {
            modal.classList.remove("hidden");
            modal.classList.add("flex");
            renderObsConfigModal();
          }
        } else if (btn.id === "btn-close-obs-modal") {
          const modal = document.getElementById("modal-obs-portrait");
          if (modal) {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
          }
        } else if (btn.id === "btn-copy-obs-url") {
          const input = document.getElementById("obs-generated-url");
          if (input) {
            input.select();
            document.execCommand("copy");
            btn.textContent = "✓ Link Copiado!";
            setTimeout(() => { btn.textContent = "📋 Copiar Link OBS"; }, 2000);
          }
        } else if (btn.id === "btn-save-obs-cfg") {
          const ag = getActiveRosterAgent();
          if (!ag) return;
          saveObsSettingsForAgent(ag.id, {
            avatarNormal: document.getElementById("obs-input-normal")?.value.trim() || "",
            avatarHurt: document.getElementById("obs-input-hurt")?.value.trim() || "",
            avatarInsane: document.getElementById("obs-input-insane")?.value.trim() || "",
            avatarDying: document.getElementById("obs-input-dying")?.value.trim() || "",
            showBars: document.getElementById("obs-chk-bars")?.checked !== false,
            showName: document.getElementById("obs-chk-name")?.checked !== false,
            showNex: document.getElementById("obs-chk-nex")?.checked !== false
          });
          renderObsConfigModal();
          const savedBtn = document.getElementById("btn-save-obs-cfg");
          if (savedBtn) {
            savedBtn.textContent = "✓ Salvo & Link Atualizado!";
            setTimeout(() => { savedBtn.textContent = "Salvar & Atualizar Link"; }, 2000);
          }
        }
      });

      document.addEventListener("change", (e) => {
        const fileInput = e.target.closest("input[data-obs-file]");
        if (!fileInput || !fileInput.files?.[0]) return;
        const fieldKey = fileInput.getAttribute("data-obs-file");
        const reader = new FileReader();
        reader.onload = async (ev) => {
          const compressed = await compressImageDataUrl(ev.target.result, 280, 0.72);
          const textInputId = {
            avatarNormal: "obs-input-normal",
            avatarHurt: "obs-input-hurt",
            avatarInsane: "obs-input-insane",
            avatarDying: "obs-input-dying"
          }[fieldKey];
          const textInput = document.getElementById(textInputId);
          if (textInput) textInput.value = compressed;
        };
        reader.readAsDataURL(fileInput.files[0]);
      });

      function bootObsConfigModule() {
        injectObsPortraitButtonAndModal();
        attachObsRollListener();
        broadcastObsSnapshot(null, true);
        setInterval(() => {
          if (!document.getElementById("btn-open-obs-modal")) {
            injectObsPortraitButtonAndModal();
          }
        }, 1500);
      }

      if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", bootObsConfigModule);
      } else {
        bootObsConfigModule();
      }
    }
})());
