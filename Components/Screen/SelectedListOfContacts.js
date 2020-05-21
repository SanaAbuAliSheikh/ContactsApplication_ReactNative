import React, {Component} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
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
import {TouchableOpacity} from 'react-native-gesture-handler';

// export default class SelectedListofContacts
export default class SelectedListOfContacts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View>
          <View style={{marginLeft: 8}}>
            <View style={styles.headerImage}>
              <Image
                source={require('./Images/addImage.jpg')}
                style={styles.image}
              />
            </View>
            <Text style={styles.headerText}>Bugging</Text>
            <View style={styles.line} />
            <Text style={styles.bodyText}>Participants</Text>
            <View style={styles.row}>
              <Item>
                <Image
                  source={require('./Images/user.jpg')}
                  style={styles.bodyImage}
                />
                <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() => this.props.navigation.navigate('Contacts')}>
                  <Text>Add Participants</Text>
                </TouchableOpacity>
              </Item>
            </View>
            <View style={styles.line} />

            <View>
              <ListItem>
                <Left>
                  <UserAvatar
                    size={40}
                    style={styles.avatar}
                    name="Sana AbuAli"
                  />
                </Left>
                <Body>
                  <Text style={styles.headerText}>You</Text>
                  <Text style={styles.headersName}>Sana AbuAli</Text>
                </Body>
              </ListItem>
            </View>
            <View>
              {this.props.route.params.information.map((names, key) => (
                <View>
                  <ListItem noBorder>
                    <Left>
                      <UserAvatar
                        size={40}
                        style={styles.avatar}
                        name={names[0]}
                      />
                    </Left>
                    <Body>
                      <Text style={styles.contactsName}>{names[0]}</Text>
                    </Body>
                  </ListItem>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  headerImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  bodyText: {
    marginTop: 10,
    fontSize: 20,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  bodyImage: {
    width: 20,
    height: 20,
  },
  touchableOpacity: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    fontSize: 18,
  },
  contactsName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headersName: {
    fontSize: 18,
  },
});
