import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { fetchVideoInfo } from "../../api";
import Loader from "../feed/feed";

const VideoDetail: React.FC = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const { id } = useParams<{ id: string }>() ?? { id: "" };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const videoDetailData = await fetchVideoInfo(id);
        setVideoDetail(videoDetailData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!videoDetail) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
  } = videoDetail;

  return (
    <Box height="92vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box
            sx={{
              width: "calc(100% - 20px)",
              margin: "auto",
              marginTop: "10px",
              paddingLeft: "20px",
            }}
          >
            <Box
              sx={{
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                controls
                width="100%"
                height="auto"
              />
            </Box>
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant="subtitle1" color="#fff">
                  {channelTitle}
                </Typography>
              </Link>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          height="92vh"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "320px", marginLeft: "auto" }}
        >
          <Loader />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
