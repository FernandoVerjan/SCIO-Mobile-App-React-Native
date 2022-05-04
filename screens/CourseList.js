import React, {useState, useEffect} from 'react'
import { Text, View, ScrollView  } from 'react-native';
import axios from 'axios'
import { ListItem } from 'react-native-elements';



const CourseList = (props) => {  

    const baseUrl = "http://localhost:3000/cursos/";


    const [courses, setCourses] = useState([])

    // const [needRefresh, setNeedRefresh] = useState(props.needRefresh)

    const peticionGet = async () => {
        await axios.get(baseUrl)
        .then((response) => {
            setCourses(response.data.cursos);
        }) .catch(err => err);
        
      };

      useEffect(() => {
        const fetchData = async () => {
          await peticionGet();
          
        };
        fetchData();
        console.log(props.needRefresh,"PROPS")
      }, [props.needRefresh]);
    

    return (
        <>
        <ScrollView>
            {
                courses.map(course => {
                    return(
                        <ListItem key={course._id} bottomDivider onPress={() => props.navigation.navigate('CourseDetail', {
                            courseId: course._id,
                        })}>
                            <ListItem.Chevron/>
                            <ListItem.Content>
                                <ListItem.Title>{course.nombre}</ListItem.Title>
                                <ListItem.Subtitle>Alumnos inscritos: {course.noAlumnos}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }
        </ScrollView>
        </>
    )
}

export default CourseList