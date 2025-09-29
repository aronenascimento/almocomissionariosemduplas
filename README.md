
### Configuração das Credenciais

As credenciais do Supabase estão no arquivo `js/config.js`. Para usar em produção, considere:

1. Criar um novo projeto no Supabase
2. Atualizar as credenciais no arquivo `config.js`
3. Configurar as políticas de segurança (RLS) no Supabase

## 📱 Como Funciona

### Agendamento

1. **Nome**: Usuário informa seu nome
2. **Data**: Seleciona uma data disponível em outubro de 2025
3. **Duplas**: Escolhe se pode dar almoço para uma ou duas duplas

### Lógica de Disponibilidade

- **Data Livre**: Todas as opções disponíveis
- **Uma Dupla Ocupada**: Sistema permite agendamento para a segunda dupla
- **Ambas Ocupadas**: Data não aparece na lista

### Calendários

- **Sisteres**: Calendário em tons de rosa
- **Elderes**: Calendário em tons de azul
- **Status Visual**: Diferenciação clara entre datas ocupadas e disponíveis

## 🎨 Design

- **Paleta de Cores**: Azul e rosa para diferenciação das duplas
- **Tipografia**: Inter (Google Fonts)
- **Layout**: Design limpo e moderno com gradientes suaves
- **Responsividade**: Adaptável a diferentes tamanhos de tela

## 🔄 Atualizações em Tempo Real

O sistema utiliza as funcionalidades de real-time do Supabase para:

- Atualizar a lista de datas disponíveis
- Refresh automático dos calendários
- Sincronização entre múltiplos usuários

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte ou dúvidas, abra uma issue no repositório do GitHub.

---
Desenvolvido com ❤️ para facilitar o agendamento de almoços missionários.
