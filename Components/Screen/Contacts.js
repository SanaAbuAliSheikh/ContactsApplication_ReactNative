import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  PermissionsAndroid,
  TextInput,
  ScrollView,
  Button,
  Group,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Icon,
  Input,
  Item,
} from 'native-base';
import Contacts from 'react-native-contacts';
import _ from 'lodash';
import UserAvatar from 'react-native-user-avatar';
import {Avatar} from 'react-native-elements';

// default export Class ContactScreen
export default class ContactScreen extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    contacts: null,
    inMemoryContact: null,
    groupContacts: [],
    selectedGroupContacts: [],
  };

  //Permission for Reading Contacts
  componentDidMount() {
    if (Platform.OS === 'ios') {
      Contacts.getAll((err, contacts) => {
        if (err) {
          throw err;
        }
        // contacts returned
        this.setState({contacts});
      });
    } else if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
          } else {
            // contacts returned in Array

            const iteratees = obj => obj.givenName;
            const sorted = _.sortBy(contacts, iteratees); // SortedContacts
            this.setState({
              contacts: sorted,
              inMemoryContact: sorted,
            });
          }
        });
      });
    }
  }

  render() {
    return (
      <View>
        <ScrollView horizontal={true} style={{marginBottom: 10}}>
          <View style={styles.row}>
            {_.map(this.state.selectedGroupContacts, (names, key) => (
              <View key={key} style={styles.selectedParticipants}>
                <Avatar
                  rounded
                  size={50}
                  containerStyle={
                    (styles.headerAvatar, {backgroundColor: '#ADD8E6'})
                  }
                  title={names[0].substring(0, 2)}
                />
                <Text style={styles.headerText}>{names[0]}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{marginTop: 20}}>
          <Item>
            <Text>🔍</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Search"
              onChangeText={value => this.searchContacts(value)}
            />
          </Item>
        </View>

        <View style={styles.line} />

        <Button
          style={styles.button}
          title="NewGroup"
          onPress={() =>
            this.props.navigation.navigate('Selected Contacts', {
              information: this.state.selectedGroupContacts,
            })
          }
        />

        <FlatList
          data={this.state.contacts}
          renderItem={({item}) => (
            <ListItem>
              <Left>
                <UserAvatar
                  size={60}
                  style={styles.bodyAvatar}
                  name={item.givenName}
                />
              </Left>
              <Body>
                <TouchableOpacity onPress={() => this.selectedContacts(item)}>
                  <Text style={styles.contactNames}>
                    {`${item.givenName} `}
                    {item.familyName}
                  </Text>
                  {item.phoneNumbers.map((phone, key) => (
                    <Text key={key}>{phone.number}</Text>
                  ))}
                </TouchableOpacity>
              </Body>
            </ListItem>
          )}
          //Setting the number of column
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }

  // SELECT OR DESELECT CONTACTS
  selectedContacts(item) {
    // If contact exists in the state, search current givenName+familyName and phoneNumber then delete them.
    // Also delete there recordID from groupContacts.
    if (this.state.groupContacts.indexOf(item.recordID) > -1) {
      {
        var phn;
        item.phoneNumbers.map(phone => {
          phn = phone.number;
        });
        let b = _.findIndex(this.state.selectedGroupContacts, function(el) {
          return el[0] == item.givenName + item.familyName && el[1] == phn;
        });
        this.state.selectedGroupContacts.splice(b, 1);
        this.setState({
          selectedGroupContacts: this.state.selectedGroupContacts,
        });
      }
      this.state.groupContacts.splice(
        this.state.groupContacts.indexOf(item.recordID),
        1,
      );
      this.setState({
        groupContacts: this.state.groupContacts,
      });
    } else {
      // If contact doesn't exist in the state, add item.recordID in groupContacts state then iterete over phone and get 1 phone number.
      // Finally save both current givenName+familyName and phoneNumber in selectedGroupContacts state.
      this.setState(
        {
          groupContacts: [...this.state.groupContacts, item.recordID],
        },
        () => {
          {
            var phns;
            item.phoneNumbers.map(phone => {
              phns = phone.number;
            });

            this.setState({
              selectedGroupContacts: [
                ...this.state.selectedGroupContacts,
                [item.givenName + item.familyName, phns],
              ],
            });
          }
        },
      );
    }
  }

  // SEARCH CONTACT
  // Lowercase the current givenName and contacts.givenName. If matched then filtered contacts.
  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContact.filter(contact => {
      let contactLowerCase = contact.givenName.toLowerCase();
      let searchTermLowerCase = value.toLowerCase();
      return contactLowerCase.indexOf(searchTermLowerCase) > -1;
    });
    this.setState({
      contacts: filteredContacts,
    });
  };
}

const styles = StyleSheet.create({
  selectedParticipants: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatar: {
    width: 50,
    height: 50,
    fontSize: 18,
  },
  bodyAvatar: {
    width: 50,
    height: 50,
    fontSize: 20,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textInput: {
    textAlign: 'center',
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    width: 300,
    marginLeft: 30,
  },
  contactNames: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {flexDirection: 'row'},
});
