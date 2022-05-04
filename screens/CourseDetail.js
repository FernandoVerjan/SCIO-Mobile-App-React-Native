import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";
import axios from "axios";




const CourseDetail = (props) => {
  const baseUrl = "http://localhost:3000/cursos/";

  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  const incrementNoAlumnos = () => {
    setCourse({ ...course, noAlumnos: course.noAlumnos++ });
  };

  const peticionGetById = async () => {
    await axios.get(baseUrl + props.route.params.courseId).then((response) => {
      setCourse(response.data.cursos);
      setLoading(false);
      console.log(response.data.cursos.noAlumnos);
    });
  };

  const peticionPatch = async () => {
    incrementNoAlumnos();
    await axios
      .patch(baseUrl + props.route.params.courseId, course)
      .then(() => {
        setCourse(course) 
      }).catch(err => err);;
      
  };

  useEffect(() => {
    const fetchData = async () => {
      await peticionGetById();
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.titleText}>{course.nombre}</Text>
      </View>
      <View>
        <Text style={styles.bodyText}>
          Creditos: <Text style={styles.innerText}>{course.creditos}</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.bodyText}>
          Descripción:{" "}
          <Text style={styles.innerText}>{course.descripcion}</Text>
        </Text>
      </View>
      <View>
        <Text style={styles.bodyText}>
          Alumnos inscritos:{" "}
          <Text style={styles.innerText}>{course.noAlumnos}</Text>
        </Text>
      </View>
      <View style={styles.btn}>
        <Button
          title="Subscribe"
          onPress={() => peticionPatch()}
          color="#347535"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
    backgroundColor: "#ffffff",
  },
  btn: {
    marginBottom: 7,
    marginTop: 7,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 15,
    marginBottom: 3,
  },
  innerText: {
    color: "#303030",
  },
});

export default CourseDetail;
