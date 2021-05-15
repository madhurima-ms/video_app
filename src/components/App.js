import React from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

class App extends React.Component {
  state = { videos: [], selectedVideo: null };


  componentDidMount(){
    this.onTermSubmit("Biden"); //Default Search Term
  }

 

//onTermSubmit is the function that is handling all the logic around doing the search and updating the state of our component.
  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", { ///WaitingTo get response from YOUTUBE Api//
      params: {
        q: term,
      },
    });

    this.setState({ 
      videos: response.data.items,
      selectedVideo: response.data.items[0] //Make the first videos as default video
     });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  render() {
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;