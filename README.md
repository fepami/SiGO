<snippet>
  <content><![CDATA[
# ${1:SiGO}

Project developed during the "Software Engineering Lab - PCS-2033" module of the Computer Engineering course at the Polytechnic School of the University of São Paulo. 

## Installation

TODO: Describe the installation process

## Usage

TODO: Write usage instructions

## Project Description (Portuguese)

O objetivo do sistema é controlar e gerenciar a execução de ordens de 

serviço (OS) de uma oficina, bem como o agendamento de atendimento dos 

clientes. 

Clientes entram em contato com a oficina para agendar serviços para 

seu(s) carro(s). Cada carro possui um agendamento. O contato pode ser por 

telefone ou pelo site. No primeiro caso, um(a) atendente consulta a agenda 

para verificar uma data e horário livre. No segundo caso, o cliente consulta a 

agenda. O agendamento é feito pela web. Neste é disponibilizado uma 

interface que mostra para cada dia do mês, os horários livres e os ocupados. 

É possível agendar horários somente para os meses vigente e o próximo. Ao 

escolher um horário livre, deve-se informar os dados do cliente (telefone e 

nome) e do veículo (modelo, placa), além do tipo de serviço (revisão 

periódica ou outro). O cancelamento de um horário agendado, pode também 

ser feito tanto pelo cliente ou pelo(a) atendente, em ambos os casos utiliza-se 

o mesmo módulo web.

Clientes levam veículos à oficina mecânica. Cada veículo é designado 

a um técnico que identifica o serviço a ser executado e preenche uma ordem 

de serviço (OS), além de prever uma data/hora de entrega. A partir da OS, 

calcula-se o valor de cada serviço, consultando-se uma tabela de referência 

de mão-de-obra. O valor de cada peça necessária à execução do serviço 

também é computado. Caso o cliente não autorize a execução do serviço, a 

OS é suspensa e o motivo (valor, ou prazo de execução) é registrado. 

Havendo a autorização, uma equipe é indicada para a realização do serviço e 

a O.S. fica como aprovada. Depois a finalização do serviço, a O.S. é 

finalizada.

Clientes possuem código, nome, endereço e telefone. Veículos 

possuem renavan, placa, modelo e ano.
O sistema sugere a equipe para o atendimento com base nos serviços 

já alocados para cada equipe, sempre tentando alocar/sugerir uma equipe 

com menor número de OS. Cada equipe é composta por 2 (dois) 

profissionais e cada uma tem um código e a especialidade que atende. Cada 

mecânico possui código, nome, endereço, telefones (pelo menos dois) e 

especialidade. O sistema não controla a formação das equipes, mas mantém 

a informação de quais mecânicos são partes de qual equipe.

Caso o cliente não concorde com o valor do serviço e/ou o horário de 

entrega a OS não é aberta e o atendimento é encerrado. Havendo 

necessidade, novo agendamento para atendimento pode ser aberto. 

Cada OS possui um número, uma data de emissão, um valor e uma 

data para conclusão dos trabalhos. Uma OS pode ser composta de vários 

itens (serviços) e um mesmo serviço pode constar em várias ordens de 

serviço. Uma OS pode envolver vários tipos de peças e

peça pode ser necessária em várias ordens de serviço.

## Credits

Alan Raso
Felipe de Paiva Miranda
Vinícius Adaime Alves de Melo


## License

TODO: Write license
]]></content>
  <tabTrigger>readme</tabTrigger>
</snippet>