import { FormControl, Grid, NativeSelect, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import PrimarySmallLayout from "../../components/layouts/gridLayout/PrimarySmallLayout";
import { Pagination, PaginationItem } from "@material-ui/lab";

import { FormattedMessage } from "react-intl";
import AppContext from "../../context/AppContext";
import { axiosInstance } from "../../util/axios-instance";

const useStyles = makeStyles((theme) => ({
  pageMargin: {
    marginTop: "2rem",
  },
  loaderWrapper: {
    minHeight: "60vh",
    minWidth: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationItem: {
    borderRadius: 5,
  },
  formControl: {
    border: `1px solid #CCCCCC`,
  },
  selectEmpty: {
    fontFamily: "Abel",
    fontWeight: 400,
    color: "#909090",
  },
  invalidSearch:{
      height: '60vh',
      
  }
}));

const SearchPage = () => {
  const context = React.useContext(AppContext);
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [load, setLoad] = useState(false);
  const [categories, setCategories] = useState([]);

  const [selected, setSelected] = useState({
    category: "all",
    limit: 12,
    select: "latest",
  });
  useEffect(() => {
    
    const fetchCategories = async () => {
      const { data } = await axiosInstance.get(`/category/getCategoryNames`);
      //   console.log(data)
      //   const temp = data.categorys.map((post) => post.name);
      //   const uniqueCategory = new Set(temp);
      //   setCategories([...uniqueCategory]);
      setCategories(data.categorys);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setLoad(true);
        console.log(
          selected.select,
          selected.category,
          selected.limit,
          page,
          context.searchPosts ? context.searchPosts : ""
        );
        if (context.searchPosts.includes('#') && !context.searchPosts.includes(',')&& !context.searchPosts.includes(' ') ){
            // console.log('ukljucuje #')
            const formatedSearch = context.searchPosts.replace(/#/g,',#').substring(1).trim()
            // console.log(`novi search je :${formatedSearch}`)
            context.searchPosts = formatedSearch
        } else if(context.searchPosts.includes('#') && !context.searchPosts.includes(',')&& context.searchPosts.includes(' ')){
            const formatedSearch = context.searchPosts.replace(/\s#/g,',#').trim()
            // console.log(`novi search je :${formatedSearch}`)
            context.searchPosts = formatedSearch
        }
        const res = await axiosInstance(`/post/getPostsBySearch`, {
          params: {
            page: page,
            category: selected.category,
            limit: selected.limit,
            select: selected.select,
            par: context.searchPosts ? context.searchPosts : "",
          },
        });
        console.log(res.data);
        if (res.status === 200) {
          setSearchedPosts(res.data.postsPaginated);
          setTotalPostCount(res.data.totalPosts);
        }

        setLoad(false);
      } catch (e) {
        setLoad(true);
      }
    };

    context.searchPosts && getPosts();
  }, [
    page,
    selected.limit,
    context.searchPosts,
    selected.category,
    selected.select,
    context
  ]);

  const handleChange = (event) => {
    const name = event.target.name;
    setSelected({
      ...selected,
      [name]: event.target.value,
    });
    // if (name == 'category') {
    //     context.searchPosts = ''
    // }
  };

  return (
    <Grid container spacing={5} className={classes.pageMargin}>
      {!context.searchPosts ? (
        <Grid item className={classes.invalidSearch}>
          <Typography variant="h2"> Please provide Search criteria</Typography>
        </Grid>
      ) : load ? (
        <div className={classes.loaderWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Grid item xs={12}>
            <Typography variant="h4" color="primary">
              Rezultati Pretrage za {` "${context.searchPosts}"`}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={11} md={8} lg={7}>
            <Grid container spacing={1}>
              <Grid item xs={4} md={4}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption">SORTIRAJ</Typography>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.formControl} fullWidth>
                      <NativeSelect
                        value={selected.select}
                        onChange={handleChange}
                        name="select"
                        className={classes.selectEmpty}
                      >
                        {/* <option value="najnovije"> */}
                        <FormattedMessage
                          id="sort.newest"
                          default="default text"
                          tagName="option"
                        />
                        {/* <Typography variant="caption">
                                    <FormattedMessage
                                        id="newest"
                                        default="default text"
                                    />
                                </Typography> */}
                        {/* </option> */}
                        <option value="visits">Najcitanije</option>
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={5}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption">KATEGORIJE</Typography>
                  </Grid>
                  <Grid item>
                    {categories && categories.length !== 0 && (
                      <FormControl className={classes.formControl} fullWidth>
                        <NativeSelect
                          value={selected.category}
                          onChange={handleChange}
                          name="category"
                          className={classes.selectEmpty}
                        >
                          <option value="all">Sve kategorije</option>
                          {categories.map((el) => (
                            <option value={el._id} key={el._id}>
                              {el.name}
                            </option>
                          ))}
                        </NativeSelect>
                      </FormControl>
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption">PRIKAZI</Typography>
                  </Grid>
                  <Grid item>
                    <FormControl className={classes.formControl}>
                      <NativeSelect
                        value={selected.limit}
                        onChange={handleChange}
                        name="limit"
                        className={classes.selectEmpty}
                      >
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                      </NativeSelect>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {searchedPosts && <PrimarySmallLayout data={searchedPosts} />}
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item>
                {totalPostCount > selected.limit && (
                  <Pagination
                    count={Math.ceil(totalPostCount / selected.limit)}
                    page={page}
                    color="secondary"
                    variant="outlined"
                    defaultPage={page}
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        className={classes.paginationItem}
                      />
                    )}
                    onChange={(e, value) => {
                      setPage(value);
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SearchPage;
