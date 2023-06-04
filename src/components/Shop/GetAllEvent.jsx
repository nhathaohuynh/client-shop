import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Loading from "../Loading";
import { toast } from "react-toastify";
import { deleteEvent, getAllEvent } from "../../redux/actions/event";

const GetAllEvent = () => {
  const { events, loadingDelete, successDelete } = useSelector(
    (state) => state.event
  );
  const { seller } = useSelector((state) => state.seller);

  console.log(events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEvent(seller._id));

    if (successDelete) {
      toast.success("Delete product successfully ", {
        position: "bottom-center",
        theme: "colored",
      });
      window.location.reload(true);
    }
  }, [dispatch, successDelete]);

  const handleClickDelete = (id) => {
    dispatch(deleteEvent(id));
    console.log(id);
  };

  const columns = [
    { field: "id", headerName: "Event", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "Preview",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/event/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "Delete",
      type: "number",

      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button>
              <AiOutlineDelete
                size={20}
                onClick={() => handleClickDelete(params.id)}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  events?.length > 0 &&
    events?.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });
  return (
    <>
      {loadingDelete ? (
        <Loading />
      ) : (
        <div className="w-[80%] 800px:w-[90%] mt-5 bg-white rounded-xl">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default GetAllEvent;