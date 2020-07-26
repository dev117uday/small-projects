from django.urls import path
from . import views
from . views import ( 
    PostListView,
    PostDetailView,
    PostCreateView,
    PostUpdateView,
    PostDeleteView,
    UserPostListView,
    rss_feed_to_object
    
    )

urlpatterns = [
    path('', PostListView.as_view(), name="Start_page"),
    path('post/<int:pk>/', PostDetailView.as_view(), name="post_details"),
    path('post/<int:pk>/update/', PostUpdateView.as_view(), name="post_update"),
    path('post/new/', PostCreateView.as_view(), name="post_create"),
    path('post/<int:pk>/delete/', PostDeleteView.as_view(), name="post_delete"),
    path('user/<str:username>/', UserPostListView.as_view(), name="user_post"),
    path('demo/',views.rss_feed_to_object,name="demo"),
    
]