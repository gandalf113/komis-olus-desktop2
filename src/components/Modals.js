import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export const NewSaleModal = ({ isOpen, closeModalCallback }) => {
    const [items, setItems] = useState([])
    const [serachValue, setSearchValue] = useState()

    useEffect(() => {
        setItems([])
        setSearchValue('')
    }, [setItems])


    const getItems = async () => {
        if (serachValue === "") {
            setItems([])
            return
        }

        await window.api.getClientsWithContractsAndItems(serachValue).then(res => {
            setItems(res)
        })
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => closeModalCallback()}
                style={customStyles}
                contentLabel="Nowa sprzedaż"
            >
                <button onClick={() => closeModalCallback()}>Zamknij</button>
                <div>Wprowadź kod z metki</div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    getItems()
                }}>
                    <input placeholder='35A2F3'
                        value={serachValue}
                        onChange={(e) => {
                            // getItems()
                            setSearchValue(e.target.value)
                        }} />
                    <button type='button' onClick={getItems}>Wyszukaj</button>
                </form>
                <div>
                    {items.map(item => (
                        <p key={item.id_przedmiotu}>{item.imie} {item.nazwisko} - {item.nazwa}</p>
                    ))}
                    {/* {
                        items[0] ?
                        <p>{items[0].skrot} {items[0].id_umowy} {items[0].id_przedmiotu} - {items[0].nazwa}</p>
                        : ''
                    } */}

                </div>
            </Modal>
        </div>
    )
}

export const NewContractModal = ({ isOpen, closeModalCallback }) => {
    const [clients, setClients] = useState([])
    const [serachValue, setSearchValue] = useState()
    const [clientId, setClientId] = useState(-1)

    useEffect(() => {
        setClients([])
        setSearchValue('')
    }, [setClients])

    const createContract = async () => {
        if (clientId === -1) return

        await window.api.createContract(clientId, getToday()).then(res => {
            console.log(res)
        })
    }

    const getClients = async () => {
        if (serachValue === "") {
            setClients([])
            return
        }

        await window.api.searchClients(serachValue).then(res => {
            setClients(res)
        })
    }

    const getToday = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => closeModalCallback()}
                style={customStyles}
                contentLabel="Nowa umowa"
            >
                <button onClick={() => closeModalCallback()}>Zamknij</button>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    createContract()
                }}>
                    <input placeholder='zawi1'
                        value={serachValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }} />
                    <button type='button' onClick={getClients}>Wyszukaj</button>
                </form>
                <div>
                    {clients.map(client => (
                        <p key={client.id_klienta} onClick={() => {
                            setClientId(client.id_klienta)
                        }}>
                            {client.skrot} - {client.imie} {client.nazwisko}
                        </p>
                    ))}
                </div>
                <button onClick={createContract}>Utwórz</button>
            </Modal>
        </div>
    )
}