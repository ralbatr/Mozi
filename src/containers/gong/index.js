import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import HomeSelector from 'selectors/home'
import * as HomeActions from 'actions/home'
import { ListItem, ListParagraph } from 'components'
import connect from 'store/connect'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
  },
  headerButton: {
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#B0B0B0',
    backgroundColor: '#B0B0B0',
    margin: 10,
    padding: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
})

@connect(HomeSelector, HomeActions)
export default class Gong extends Component {
  static navigationOptions = {
    headerTitle: 'FlatList and Placeholder',
  }

  componentWillMount() {
    this.props.actions.fetchLibrary()
  }

  headerImageScrollView = () => {
    const { navigation } = this.props
    navigation.navigate('HeaderImageScrollView')
  }

  flatList = () => {
    const { home } = this.props
    return (
      <FlatList
        style={styles.container}
        keyExtractor={item => item.data[0].id}
        ListHeaderComponent={() => {
          return this.renderHeader()
        }}
        renderItem={item => {
          return this.renderItem(item)
        }}
        data={home}
      />
    )
  }
  renderHeader = () => {
    return (
      <View style={styles.headerButton}>
        <Text style={styles.welcome} onPress={this.headerImageScrollView}>
          自定义头部图片 & 缩放!
        </Text>
      </View>
    )
  }

  renderItem = item => {
    return <ListItem data={item.item.data[0]} gopage={this.goPage} />
  }

  render() {
    const { loading } = this.props

    return <ListParagraph ParagraphLength={5} isLoading={loading} list={this.flatList} />
  }
}
