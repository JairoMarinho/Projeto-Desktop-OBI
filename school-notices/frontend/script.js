// Função para carregar os avisos
function loadNotices() {
    fetch('http://localhost:3000/api/notices')  // Alvo correto da API
      .then(response => response.json())
      .then(notices => {
        const noticesList = document.getElementById('notices-list');
        noticesList.innerHTML = ''; // Limpa a lista antes de carregar novos avisos
        
        // Se não houver avisos, exibe uma mensagem
        if (notices.length === 0) {
          noticesList.innerHTML = `<p>Não há avisos no momento.</p>`;
          return;
        }
        
        // Cria um elemento para cada aviso
        notices.forEach(notice => {
          const noticeElement = document.createElement('div');
          noticeElement.classList.add('notice');
          noticeElement.innerHTML = `
            <h3>${notice.title}</h3>
            <p class="date"><strong>Data:</strong> ${notice.date}</p>
            <p class="message">${notice.message}</p>
          `;
          noticesList.appendChild(noticeElement);
        });
      })
      .catch(error => {
        console.error('Erro ao carregar avisos:', error);
      });
  }
  
  // Função para adicionar um novo aviso
  function addNotice() {
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const message = document.getElementById('message').value;
  
    // Verificação simples para garantir que todos os campos foram preenchidos
    if (!title || !date || !message) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    const newNotice = {
      title: title,
      date: date,
      message: message
    };
  
    // Enviando o novo aviso para a API
    fetch('http://localhost:3000/api/notices', {  // API do backend
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNotice)
    })
    .then(response => response.json())
    .then(() => {
      loadNotices(); // Recarrega os avisos após adicionar
      document.getElementById('title').value = '';
      document.getElementById('date').value = '';
      document.getElementById('message').value = '';
    })
    .catch(error => {
      console.error('Erro ao adicionar aviso:', error);
    });
  }
  
  // Carregar os avisos ao carregar a página
  loadNotices();
  