import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { firestore } from '../firebaseConfig';

const Separator = () => {
    return <View style={styles.separator} />;
};

export default function ProductsManager() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteKey, setDeleteKey] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {

        async function search() {
            await firestore.database().ref('stores').on('value', (snapshot) => {
                setProducts([]);
                snapshot.forEach((chilItem) => {
                    let data = {
                        key: chilItem.key,
                        name: chilItem.val().name,
                        brand: chilItem.val().brand,
                        type: chilItem.val().type,
                        price: chilItem.val().price,
                    };
                    setProducts(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false);
            })
        }
        search();
    }, []);

    async function insertUpdate() {
        if (name !== '' & brand !== '' & type !== '' & price !== '' & key !== '') {
            firestore.database().ref('stores').child(key).update({
                name: name, brand: brand,
                type: type, price: price
            })

            Keyboard.dismiss();
            alert('Produto Alterado!');
            clearData();
            setKey('');
            return;
        }

        let prods = await firestore.database().ref('stores');
        let keyprod = prods.push().key;

        prods.child(keyprod).set({
            name: name,
            brand: brand,
            type: type,
            price: price,
        });
        alert('Curso Inserido!');
        clearData();
    }

    function clearData() {
        setName('');
        setBrand('');
        setType('');
        setPrice('');
    }

    function handleDelete(key) {
        firestore.database().ref('stores').child(key).remove()
            .then(() => {
                const findProducts = products.filter(item => item.key !== key)
                setProducts(findProducts)
            })
    }

    function handleEdit(data) {
            setKey(data.key),
            setName(data.name),
            setBrand(data.brand),
            setType(data.type),
            setPrice(data.price)
    }

    function hideModal(key) {
        setDeleteKey(key);
        setModalVisible(true);
    }

    function handleDeleteConfirmed() {
        handleDelete(deleteKey);
        setModalVisible(false);
        setDeleteKey(null); // Resetar a chave deletada após a exclusão
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Nome"
                left={<TextInput.Icon icon="cellphone" />}
                maxLength={40}
                style={styles.input}
                onChangeText={(texto) => setName(texto)}
                value={name}
            />
            <Separator />
            <TextInput
                placeholder="Estilo"
                left={<TextInput.Icon icon="apple" />}
                style={styles.input}
                onChangeText={(texto) => setBrand(texto)}
                value={brand}
            />
            <Separator />
            <TextInput
                placeholder="Autor"
                left={<TextInput.Icon icon="cellphone-dock" />}
                style={styles.input}
                onChangeText={(texto) => setType(texto)}
                value={type}
            />
            <Separator />
            <TextInput
                placeholder="Preço"
                left={<TextInput.Icon icon="sack" />}
                style={styles.input}
                onChangeText={(texto) => setPrice(texto)}
                value={price}
            />
            <Separator />
            <TouchableOpacity onPress={insertUpdate} style={styles.button} activeOpacity={0.5}>
                <Text style={styles.buttonTextStyle}>Salvar</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.listar}>Listagem de Produtos</Text>
            </View>


            {
                loading ?
                    (
                        <ActivityIndicator color="#121212" size={45} />
                    ) :
                    (
                        <FlatList
                            keyExtractor={item => item.key}
                            data={products}
                            renderItem={({ item }) => (
                                <ListProd data={item} deleteItem={() => hideModal(item.key)}
                                    editItem={handleEdit} />
                            )}
                        />
                    )
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Tem certeza que deseja excluir este produto?</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button title="Excluir" onPress={handleDeleteConfirmed} color="red" />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#121212',
        height: 40,
        fontSize: 13,
        borderRadius: 8
    },
    separator: {
        marginVertical: 5,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3ea6f2',
        borderWidth: 0.5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5,
        margin: 5,
    },
    buttonImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    buttonTextStyle: {
        color: '#fff',
        marginBottom: 4,
        marginLeft: 130,
        fontSize: 20
    },
    buttonIconSeparatorStyle: {
        backgroundColor: '#fff',
        width: 1,
        height: 20,
    },
    listar: {
        fontSize: 20,
        textAlign: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
