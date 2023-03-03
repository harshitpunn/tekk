import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import Moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import SendOfferButton from '../technician/SendOfferButton';

const JobContainer = () => {
  const [post, setPost] = useState(null);
  const { params } = useRoute();
  const { id } = params;
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`http://localhost:5001/api/v1/jobs/${id}`)
      .then((resp) => resp.json())
      .then((json) => setPost(json))
      .catch((error) => console.error(error));
  }, [id]);

  const handleSendOffer = () => {
    navigation.navigate('SendOffer', { jobId: post._id });
  };

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Image style={styles.postImage} source={{ uri: post.picture }} />
      <Text style={styles.postDescription}>{post.title}</Text>
      <Text style={styles.postDescription}>{post.description}</Text>
      <Text style={styles.postDescription}>{Moment(post.posted_date).format('d/MM/YYYY')}</Text>
      <SendOfferButton jobId={post._id} handleSendOffer={handleSendOffer} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  postDescription: {
    fontSize: 18,
    marginBottom: 10,
  },
  postImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
});

export default JobContainer;
