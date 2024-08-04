// assets.js
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../DATABASE/firebaseConfig';
import axios from 'axios';
// Função para adicionar uma semana a uma data
export function addWeekToDateString(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 7);
    const newDay = String(date.getDate()).padStart(2, '0');
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newYear = date.getFullYear();
    return `${newDay}/${newMonth}/${newYear}`;
}

// Função para formatar um número no formato brasileiro
export const formatNumber = (value) => {
    if (typeof value !== 'number' || isNaN(value)) {
        return '0.00'; // Valor padrão caso o valor seja indefinido ou não seja um número
    }
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};



export const formatCPF = (cpf) => {
    if (cpf != 'NULL') {
        cpf = cpf.replace(/\D/g, '');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return '';
};

export const getClients = async (setUsers) => {
    try {
        // Fazer a requisição GET para a API
        const response = await axios.get('http://localhost:4000/clientes/getAllClientesWithPlusInfo');
        const userList = response.data;

        // Atualizar o estado com os dados recebidos
        setUsers(userList);
    } catch (error) {
        console.error("Error getting clients: ", error);
    }
};

export async function getMonthlyYield() {
    try {
        const rendimentoDocRef = doc(db, "SYSTEM_VARIABLES", "RENDIMENTO");
        const rendimentoDocSnapshot = await getDoc(rendimentoDocRef);

        if (rendimentoDocSnapshot.exists()) {
            const data = rendimentoDocSnapshot.data();
            return data.RENDIMENTO_MENSAL;
        } else {
            console.log("O documento não existe!");
            return null;
        }
    } catch (error) {
        console.error("Erro ao obter rendimento mensal: ", error);
        return null;
    }
}

export function formatDate(dateString) {

    if (dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }else return null;

}


export function adicionarAno(data) {

    if(!data)
        return null;

    const [dia, mes, ano] = data.split('/').map(Number);
    const dataOriginal = new Date(ano, mes - 1, dia);
    dataOriginal.setFullYear(dataOriginal.getFullYear() + 1);
    const diaNovo = dataOriginal.getDate().toString().padStart(2, '0');
    const mesNovo = (dataOriginal.getMonth() + 1).toString().padStart(2, '0');
    const anoNovo = dataOriginal.getFullYear();
    return `${diaNovo}/${mesNovo}/${anoNovo}`;
}

export function formatCurrencyBRL(value) {
    // Converte o valor para string
    const valueStr = String(value).replace(',', '.');

    // Converte a string para número
    const number = parseFloat(valueStr);

    // Verifica se a conversão foi bem-sucedida
    if (isNaN(number)) {
        throw new Error("Invalid input. Please provide a valid number string.");
    }

    // Formata o número no padrão brasileiro
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}