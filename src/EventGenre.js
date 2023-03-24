import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const EventGenre = ({ events }) => {

  const [data, setData] = useState([]);

  const colors = ['#FF5A5A', '#ADB5AF', '#4F6367', '#7A9E9F', '#96C2C3'];

  useEffect(() => {
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];
      const data = genres.map((genre) => {
        const value = events.filter((event) =>
          event.summary
            .toUpperCase()
            .replace(/[,.!-]/g, ' ')
            .replace('JS', ' ')
            .split(' ')
            .includes(genre.toUpperCase())
        ).length;
        return { name: genre, value };
      });
      return data.filter((genre) => genre.value !== 0);
    };
    setData(() => getData());
  }, [events]);

  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius={100}
          dataKey='value'
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign='bottom' height={70} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;
