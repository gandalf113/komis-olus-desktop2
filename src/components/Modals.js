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